from fastapi import APIRouter, Depends
from src.models import schemas
from src.core.dbutils import get_db
from src.models.models import SMS, Email
from sqlalchemy.orm import Session
from src.core.rabbitmq import rabbitmq_publisher
from src.models.enums import RabbitMQ, CeleryTaskName
from src.core.config import Config
import logging

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/notification",
    tags=["notification"]
)


@router.post("/sms")
def trigger_sms(info: schemas.CreateSMS, db: Session = Depends(get_db)):
    # TODO: Add validations for request
    db_sms = SMS(from_=Config.TWILIO_FROM_PHONE, to_=info.to_, message=info.message)
    db.add(db_sms)
    db.commit()
    logger.info(f"SMS to {db_sms.to_} queued with id {db_sms.id}")
    
    # create celery task
    rabbitmq_publisher.send_celery_task(
        task_name=CeleryTaskName.PROCESS_SMS.value,
        queue_name=RabbitMQ.SMS_QUEUE.value,
        data={
            "id": db_sms.id, 
            "from_": db_sms.from_,
            "to_": db_sms.to_, 
            "message": db_sms.message
        }
    )
    
    return {"status": "SMS queued",  "id": db_sms.id}


@router.post("/email")
def trigger_email(info: schemas.CreateEmail, db: Session = Depends(get_db)):
    # TODO: Add validations for request
    db_email = Email(from_=Config.BREVO_FROM_EMAIL, to_=info.to_, subject=info.subject, message=info.message)
    db.add(db_email)
    db.commit()

    # create celery task
    rabbitmq_publisher.send_celery_task(
        task_name=CeleryTaskName.PROCESS_EMAIL.value,
        queue_name=RabbitMQ.EMAIL_QUEUE.value, 
        data={
            "id": db_email.id,
            "from_": db_email.from_,
            "to_": db_email.to_,
            "subject": db_email.subject,
            "message": db_email.message
        }
    )
    
    return {"status": "Email queued", "id": db_email.id}


