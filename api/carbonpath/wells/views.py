from core.serializers import BoolSerializer
from django.conf import settings
from drf_spectacular.utils import extend_schema, extend_schema_view
from enverus_developer_api import DeveloperAPIv3
from ipfs.ipfs import update_or_create_ipfs_asset
from ipfs.serializers import IPFSAssetDataSerializer
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from wells.managers import WellManager

from .models import TokenTransaction, Well
from .serializers import (
    MintSerializer,
    ReadTokenTransactionSerializer,
    SavedWellSerializer,
    TokenTransactionSerializer,
    TotalWellStatSerializer,
    WellSerializer,
)


@extend_schema_view(
    list=extend_schema(operation_id="Wells: List", description="List Well instances", responses={200: WellSerializer}),
    retrieve=extend_schema(
        operation_id="Wells: Retrieve",
        description="Retrieve a Well instance",
        responses={200: WellSerializer},
    ),
)
class WellViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (permissions.AllowAny,)
    serializer_class = WellSerializer
    queryset = Well.objects.all()

    def get_serializer(self, *args, **kwargs):
        return super().get_serializer(*args, **kwargs)

    @extend_schema(
        operation_id="Wells: Minted wells",
        description="Only fetch minted wells",
        request=None,
    )
    @action(detail=False, methods=["get"], url_path="minted-wells")
    def minted_wells(self, request, pk=None):
        queryset = self.filter_queryset(self.get_queryset().minted_wells())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @extend_schema(
        operation_id="Wells: Fetch Well Data from Enverus",
        description="Fetch Well Data from Enverus",
        request=None,
        responses={200: {}, 400: {}},
    )
    @action(detail=True, methods=["get"], url_path="fetch-enverus-well-data")
    def fetch_enverus_well_data(self, request, pk=None):
        well = self.get_object()
        v3 = DeveloperAPIv3(secret_key=settings.ENVERUS_V3_SECRET_KEY)
        if well.api_id:
            query = v3.query("wells", API_UWI_14_Unformatted=well.api_id)
        else:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
        data = [*query]
        try:
            return Response(data[0])
        except IndexError:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        operation_id="Wells: Pin to IPFS",
        description="Pin a Well to IPFS",
        request=None,
        responses={201: IPFSAssetDataSerializer},
    )
    @action(detail=True, methods=["post"], permission_classes=(permissions.IsAdminUser,))
    def ipfs(self, request, pk=None):
        instance = self.get_object()

        if not instance.is_approved or instance.mint_status == "minted":
            return Response(status=status.HTTP_403_FORBIDDEN)

        ipfs_asset = update_or_create_ipfs_asset(instance)
        serializer = IPFSAssetDataSerializer(ipfs_asset)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @extend_schema(
        operation_id="Wells: Mint",
        description="Store minting info",
        request=MintSerializer,
        responses={200: MintSerializer},
    )
    @action(detail=True, methods=["post"], permission_classes=(permissions.IsAdminUser,))
    def mint(self, request, pk=None):
        instance = self.get_object()

        if not instance.is_approved or instance.mint_status == "minted":
            return Response(status=status.HTTP_403_FORBIDDEN)

        serializer = MintSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.update(instance, serializer.data)

        instance.mint_status = "minted"
        instance.blockchain = "Celo"
        instance.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(
        operation_id="Wells: Retire Tokens",
        description="Store retire token info",
        request=TokenTransactionSerializer,
        responses={200: TokenTransactionSerializer},
    )
    @action(detail=True, methods=["post"])
    def retire(self, request, pk=None):
        instance = self.get_object()

        serializer = TokenTransactionSerializer(
            data=request.data, context={"user": request.user, "well": instance, "type": "retire"}
        )
        serializer.is_valid(raise_exception=True)
        serializer.create(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(
        operation_id="Wells: User Save Well",
        description="Add a well as part of the user's saved wells",
        request={},
        responses={200: SavedWellSerializer},
    )
    @action(detail=True, methods=["post"], url_path="save-well", permission_classes=(permissions.IsAuthenticated,))
    def save_well(self, request, pk=None):
        instance = self.get_object()
        request.user.saved_wells.add(instance)
        serializer = SavedWellSerializer(instance, context={"user": request.user})

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(
        operation_id="Wells: User Remove Well",
        description="Remove a well from user's saved wells",
        request={},
        responses={200: SavedWellSerializer},
    )
    @action(detail=True, methods=["post"], url_path="remove-well", permission_classes=(permissions.IsAuthenticated,))
    def remove_well(self, request, pk=None):
        instance = self.get_object()
        request.user.saved_wells.remove(instance)
        serializer = SavedWellSerializer(instance, context={"user": request.user})

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(
        operation_id="Wells: User Is Saved Well",
        description="Check if a well is part of a user's saved wells",
        request={},
        responses={200: BoolSerializer},
    )
    @action(detail=True, methods=["get"], url_path="is-saved-well", permission_classes=(permissions.IsAuthenticated,))
    def is_saved_well(self, request, pk=None):
        instance = self.get_object()

        result = True if request.user.saved_wells.filter(pk=instance.pk) else False
        output_serializer = BoolSerializer(data={"result": result})
        output_serializer.is_valid()
        return Response(output_serializer.data)

    @extend_schema(
        operation_id="Wells: User My Saved Wells",
        description="Return a list of all saved wells by the user",
        request={},
        responses={200: WellSerializer},
    )
    @action(methods=["get"], detail=False, url_path="my-saved-wells", permission_classes=(permissions.IsAuthenticated,))
    def my_saved_wells(self, request):
        qs = request.user.saved_wells.all()

        page = self.paginate_queryset(qs)
        if page is not None:
            serializer = SavedWellSerializer(page, many=True, context={"user": request.user})
            return self.get_paginated_response(serializer.data)

        serializer = SavedWellSerializer(qs, many=True, context={"user": request.user})
        return Response(serializer.data)

    @extend_schema(
        operation_id="Wells: Statistics",
        description="Show basic statistics of wells",
        request=None,
        responses={200: TotalWellStatSerializer},
    )
    @action(detail=False, methods=["get"], url_path="statistics")
    def statistics(self, request, pk=None):

        qs_well = Well.objects.all().with_total_eavs()
        qs_retired = TokenTransaction.objects.all().with_total_retired_amount()

        serializer = TotalWellStatSerializer(
            data={
                "total_advanced_eavs": qs_well["total_advanced_eavs"],
                "total_buffer_pool_eavs": qs_well["total_buffer_pool_eavs"],
                "total_carbon_retired": qs_retired["total_retired_amount"],
            }
        )
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data)


class TokenTransactionViewSet(viewsets.GenericViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = TokenTransactionSerializer
    queryset = TokenTransaction.objects.all()

    @extend_schema(
        operation_id="Token Transaction: Mine",
        description="Return all transactions of the user",
        request=None,
        responses={200: ReadTokenTransactionSerializer},
    )
    @action(detail=False, methods=["get"])
    def mine(self, request):
        qs = self.get_queryset().filter(user=request.user)

        page = self.paginate_queryset(qs)
        if page is not None:
            serializer = ReadTokenTransactionSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ReadTokenTransactionSerializer(qs, many=True)
        return Response(serializer.data)

    @extend_schema(
        operation_id="Token Transaction: Purchase",
        description="Store purchase info",
        request=None,
        responses={200: TokenTransactionSerializer},
    )
    @action(detail=False, methods=["post"])
    def purchase(self, request):
        serializer = self.get_serializer(data=request.data, context={"user": request.user, "type": "purchase"})
        serializer.is_valid(raise_exception=True)
        serializer.create(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
