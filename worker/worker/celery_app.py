from celery import Celery
from core.config import Config
from core.enums import RabbitMQ
from kombu import Queue


# Initialize Celery app
app = Celery(
    'worker',
    broker=Config.CELERY_BROKER_URL,
    include=['worker.tasks']
)

app.conf.update(
    result_backend=Config.CELERY_RESULT_BACKEND_URL,
    task_serializer='json',
    accept_content=['json'],
    enable_utc=True,
    worker_concurrency=2,  # Adjust based on your needs
    task_acks_late=True,  # Acknowledge tasks after they're processed
    task_reject_on_worker_lost=True,  # Requeue tasks if worker is lost
    task_queues=(
        Queue(RabbitMQ.EMAIL_QUEUE.value),
        Queue(RabbitMQ.SMS_QUEUE.value),
    ),
    task_routes={
        'email.process_email': {'queue': RabbitMQ.EMAIL_QUEUE.value},
        'sms.process_sms': {'queue': RabbitMQ.SMS_QUEUE.value},
    },
)

if __name__ == '__main__':
    app.start()