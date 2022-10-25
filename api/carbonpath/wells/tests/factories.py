from factory import Faker
from factory.declarations import SubFactory
from factory.django import DjangoModelFactory
from users.tests.factories import UserFactory
from wells.models import TokenTransaction, Well


class WellFactory(DjangoModelFactory):
    name = Faker("company")
    cost_per_tonne = Faker("pyint")
    tonnes_of_cO2 = Faker("pyint")
    status = Faker("word", ext_word_list=["Verified", "Unverified"])

    type = ["Oil", "Gas"]
    source = ["Unused", "Methane Emissions"]

    # admin_contract_address = Faker("pystr", min_chars=16, max_chars=16)
    # nft_contract_address = Faker("pystr", min_chars=16, max_chars=16)
    # token_contract_address = Faker("pystr", min_chars=16, max_chars=16)
    # token_id = Faker("pystr", min_chars=16, max_chars=16)
    blockchain = "Celo"
    metadata = "Centralised"

    field = Faker("city", locale="en_US")
    county = Faker("city", locale="en_US")
    state = Faker("state", locale="en_US")
    md = Faker("pyint")
    tvd = Faker("pyint")
    producing_formation = Faker("city", locale="en_US")
    legal_description = Faker("pystr", min_chars=16, max_chars=16)
    lease_id = Faker("pyint")
    well_type = Faker("word", ext_word_list=["Vertical", "Horizontal", "Multilateral"])
    township = Faker("pystr", min_chars=4, max_chars=4)
    range = Faker("pystr", min_chars=4, max_chars=4)
    shl_section = Faker("pyint")
    bhl_section = Faker("pyint")
    shl_latitude = Faker("latitude")
    shl_longitude = Faker("longitude")
    first_perforation_depth = Faker("pyint")
    last_perforation_depth = Faker("pyint")
    first_production = Faker("date_object")

    class Meta:
        model = Well


class TokenTransactionFactory(DjangoModelFactory):
    well = SubFactory(WellFactory)
    user = SubFactory(UserFactory)
    transaction_hash = Faker("pystr", min_chars=32, max_chars=32)
    amount = Faker("pyint")

    class Meta:
        model = TokenTransaction
