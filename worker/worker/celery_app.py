from celery import Celery
from core.config import Config


# Initialize Celery app
app = Celery(
    'worker',
    broker=Config.CELERY_BROKER_URL,
    include=['worker.tasks']
)

app.conf.update(
    result_backend=None,
    task_serializer='json',
    accept_content=['json'],
    enable_utc=True,
    worker_concurrency=2,  # Adjust based on your needs
    task_acks_late=True,  # Acknowledge tasks after they're processed
    task_reject_on_worker_lost=True,  # Requeue tasks if worker is lost
)

if __name__ == '__main__':
    app.start()