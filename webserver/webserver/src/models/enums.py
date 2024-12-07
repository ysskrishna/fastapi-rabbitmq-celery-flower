from enum import Enum


class CeleryTaskName(Enum):
    PROCESS_SMS = "sms.process_sms"
    PROCESS_EMAIL = "email.process_email"

class RabbitMQ(Enum):
    SMS_QUEUE = "sms_queue"
    EMAIL_QUEUE = "email_queue"

