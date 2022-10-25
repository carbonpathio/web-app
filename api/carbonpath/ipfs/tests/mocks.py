class MockResponse:
    def __init__(self, dict, status_code):
        self.data = dict
        self.status_code = status_code

    def json(self):
        return self.data


file_pin_1 = {
    "IpfsHash": "bafkreieew2zh4rnwc6qoz7shreqlpqb6eakts7qrzwhvyhel2rb3jxm7cy",
    "PinSize": 35018,
    "Timestamp": "2021-12-09T09:48:30.396Z",
}

metadata_pin_1 = {
    "IpfsHash": "bafkreibogzmn2hfbamaw7a4ncuw3tno22latrcmiomgjefa6iax6mh3y3u",
    "PinSize": 369,
    "Timestamp": "2021-12-09T14:32:10.848Z",
}

file_pin_2 = {
    "IpfsHash": "bafkreielm37prh55d52hnrptzsxp36v6yab6a5jlsivraoxm6r6plm543a",
    "PinSize": 467,
    "Timestamp": "2021-12-09T13:08:52.116Z",
}
metadata_pin_2 = {
    "IpfsHash": "bafkreifm4okry6tg675wb7enh5i7t6rxcg4k4vct4jwsbghw4lv2gl5qoq",
    "PinSize": 281,
    "Timestamp": "2021-12-09T14:40:20.430Z",
}
