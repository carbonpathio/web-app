import datetime
from decimal import Decimal

import pytest
from alerts.models import Alert
from alerts.tests.factories import AlertTypeFactory
from users.tests.factories import UserFactory
from wells.models import TokenTransaction

from .factories import TokenTransactionFactory, WellFactory


pytestmark = pytest.mark.django_db


class TestWellModel:
    def test_create(self):
        name = "Kraken Oil and Gas"
        cost_per_tonne = 32
        tonnes_of_cO2 = 1200
        status = "Verified"
        type = ["Gas"]
        source = ["Methane"]
        admin_contract_address = "RTokenkegQfeZyiNwAJbNb"
        token_id = "HQXNPnhXPkd78Xm"
        blockchain = "Celo"
        metadata = "Centralised"
        field = "Elm Coulee"
        county = "Richland"
        state = "Montana"
        md = 11984
        tvd = 8135
        producing_formation = "Bakken"
        legal_description = "26N-52E-04 NENW 265 FNL, 1835 FWL"
        lease_id = 8986
        well_type = "Horizontal"
        township = "26 N"
        range = "52 E"
        shl_section = 4
        bhl_section = 4
        shl_latitude = 48.040858
        shl_longitude = 105.014881
        first_perforation_depth = 11974
        last_perforation_depth = 8340
        first_production = datetime.date(2013, 11, 1)

        well = WellFactory(
            name=name,
            cost_per_tonne=cost_per_tonne,
            tonnes_of_cO2=tonnes_of_cO2,
            status=status,
            type=type,
            source=source,
            admin_contract_address=admin_contract_address,
            token_id=token_id,
            blockchain=blockchain,
            metadata=metadata,
            field=field,
            county=county,
            state=state,
            md=md,
            tvd=tvd,
            producing_formation=producing_formation,
            legal_description=legal_description,
            lease_id=lease_id,
            well_type=well_type,
            township=township,
            range=range,
            shl_section=shl_section,
            bhl_section=bhl_section,
            shl_latitude=shl_latitude,
            shl_longitude=shl_longitude,
            first_perforation_depth=first_perforation_depth,
            last_perforation_depth=last_perforation_depth,
            first_production=first_production,
        )
        assert well.pk is not None
        assert well.name == name
        assert well.cost_per_tonne == cost_per_tonne
        assert well.tonnes_of_cO2 == tonnes_of_cO2
        assert well.status == status
        assert well.type == type
        assert well.source == source
        assert well.admin_contract_address == admin_contract_address
        assert well.token_id == token_id
        assert well.blockchain == blockchain
        assert well.metadata == metadata
        assert well.field == field
        assert well.county == county
        assert well.state == state
        assert well.md == md
        assert well.tvd == tvd
        assert well.producing_formation == producing_formation
        assert well.legal_description == legal_description
        assert well.lease_id == lease_id
        assert well.well_type == well_type
        assert well.township == township
        assert well.range == range
        assert well.shl_section == shl_section
        assert well.bhl_section == bhl_section
        assert well.shl_latitude == shl_latitude
        assert well.shl_longitude == shl_longitude
        assert well.first_perforation_depth == first_perforation_depth
        assert well.last_perforation_depth == last_perforation_depth
        assert well.first_production == first_production

    def test_alert_on_mint(self):
        type = "Location"
        state = "t1"
        country = "USA"
        name = f"{state}, {country}"
        user = UserFactory()
        alert_type = AlertTypeFactory(type=type, name=name, subscribers_list=(user,))
        well = WellFactory(state="t1", country="USA")
        well.mint_status = "minted"
        well.save()

        assert Alert.objects.filter(type=alert_type, user=user).exists()

    def test_no_alert_on_mint_if_no_subscribers(self):
        type = "Location"
        state = "t2"
        country = "USA"
        name = f"{state}, {country}"
        user = UserFactory()
        alert_type = AlertTypeFactory(type=type, name=name, subscribers_list=(user,))
        well = WellFactory(state="t1", country="USA")
        well.mint_status = "minted"
        well.save()
        assert not Alert.objects.filter(type=alert_type, user=user).exists()

    def test_retired_amount(self):
        amount_retired_1 = 20
        amount_retired_2 = 30
        well = WellFactory()
        TokenTransactionFactory(well=well, amount=amount_retired_1)
        TokenTransactionFactory(well=well, amount=amount_retired_2)

        assert well.retired_amount == amount_retired_1 + amount_retired_2

    def test_retired_amount_decimal(self):
        amount_retired_1 = 20.5
        amount_retired_2 = 30.5
        well = WellFactory()
        TokenTransactionFactory(well=well, amount=amount_retired_1)
        TokenTransactionFactory(well=well, amount=amount_retired_2)

        assert well.retired_amount == Decimal(amount_retired_1 + amount_retired_2)


class TestTokenTransactionModel:
    def test_create(self):
        transaction_hash = "0x123456"
        TokenTransactionFactory(transaction_hash=transaction_hash, amount=2.5)
        assert TokenTransaction.objects.filter(transaction_hash=transaction_hash, amount=2.5).exists()
