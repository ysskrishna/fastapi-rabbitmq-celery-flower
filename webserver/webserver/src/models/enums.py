from enum import Enum


class OutboxEventType(Enum):
    TRIGGER_SMS = "trigger_sms"
    TRIGGER_EMAIL = "trigger_email"


class RabbitMQ(Enum):
    SMS_QUEUE = "sms_queue"
    EMAIL_QUEUE = "email_queue"

