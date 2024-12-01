from enum import Enum


class RabbitMQ(Enum):
    SMS_QUEUE = "sms_queue"
    EMAIL_QUEUE = "email_queue"