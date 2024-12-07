from fastapi import APIRouter, Depends, HTTPException
from src.models import models, schemas
from src.core.dbutils import get_db
from src.models.models import SMS, Email
from sqlalchemy.orm import Session
from src.core.rabbitmq import rabbitmq_publisher
from src.models.enums import RabbitMQ, CeleryTaskName
import logging

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/notification",
    tags=["notification"]
)


@router.post("/sms")
def trigger_sms(info: schemas.CreateSMS, db: Session = Depends(get_db)):
    # TODO: Add validations for request
    db_sms = SMS(phone=info.phone, message=info.message)
    db.add(db_sms)
    db.commit()
    logger.info(f"SMS to {db_sms.phone} queued with id {db_sms.id}")
    
    # create celery task
    rabbitmq_publisher.send_celery_task(
        task_name=CeleryTaskName.PROCESS_SMS.value,
        queue_name=RabbitMQ.SMS_QUEUE.value,
        data={
            "sms_id": db_sms.id, 
            "phone": db_sms.phone, 
            "message": db_sms.message
        }
    )
    
    return {"status": "SMS queued",  "id": db_sms.id}


@router.post("/email")
def trigger_email(info: schemas.CreateEmail, db: Session = Depends(get_db)):
    # TODO: Add validations for request
    db_email = Email(email=info.email, subject=info.subject, message=info.message)
    db.add(db_email)
    db.commit()

    # create celery task
    rabbitmq_publisher.send_celery_task(
        task_name=CeleryTaskName.PROCESS_EMAIL.value,
        queue_name=RabbitMQ.EMAIL_QUEUE.value, 
        data={
            "email_id": db_email.id,
            "email": db_email.email,
            "subject": db_email.subject,
            "message": db_email.message
        }
    )
    
    return {"status": "Email queued", "id": db_email.id}


