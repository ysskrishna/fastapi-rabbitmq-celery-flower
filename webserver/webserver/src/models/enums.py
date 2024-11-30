from enum import Enum


class OutboxEventType(Enum):
    TRIGGER_SMS = "trigger_sms"
    TRIGGER_EMAIL = "trigger_email"
