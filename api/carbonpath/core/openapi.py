from drf_spectacular.extensions import OpenApiAuthenticationExtension
from drf_spectacular.plumbing import build_bearer_security_scheme_object


def custom_preprocessing_hook(endpoints):
    # Remove auth and users views from docs.
    return [
        (path, path_regex, method, callback)
        for path, path_regex, method, callback in endpoints
        if not path.startswith("/api/v1/authentication") and not path.startswith("/api/v1/users")
    ]


class TokenScheme(OpenApiAuthenticationExtension):
    target_class = "knox.auth.TokenAuthentication"
    name = "Token Authentication"
    match_subclasses = True
    priority = -1

    def get_security_definition(self, auto_schema):
        return build_bearer_security_scheme_object(
            header_name="Authorization",
            token_prefix="Bearer",
        )
