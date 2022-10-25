def create_token(token_model, user, serializers):
    return token_model.objects.create(user=user)


def get_nonce_from_message(message=None):
    if isinstance(message, str):
        return message.split("Nonce: ")[-1]
    return None


def get_wallet_message(nonce=None):
    return f"I'm verifying my CarbonPath Login Nonce: {nonce}"
