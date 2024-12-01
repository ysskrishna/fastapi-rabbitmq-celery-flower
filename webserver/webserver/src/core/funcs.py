from uuid6 import uuid7


def generate_idempotency_key() -> str:
    return uuid7()
