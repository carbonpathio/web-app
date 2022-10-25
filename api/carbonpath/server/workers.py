from uvicorn.workers import UvicornWorker


class SecureUvicornWorker(UvicornWorker):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Prevent the server from being added for security reasons.
        self.config.server_header = False
