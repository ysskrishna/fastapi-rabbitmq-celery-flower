from fastapi import APIRouter, Depends, HTTPException
from src.models import models, schemas
from src.core.dbutils import get_db
from src.models.models import SMS, Email
from sqlalchemy.orm import Session
import json
from src.core.rabbitmq import rabbitmq_publisher
from src.core.funcs import generate_idempotency_key
from src.models.enums import RabbitMQ

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
    
    idempotency_key = generate_idempotency_key()
    payload = {
        "sms_id": db_sms.id, 
        "phone": db_sms.phone, 
        "message": db_sms.message,
        "idempotency_key": idempotency_key
    }
    
    # Now send to RabbitMQ after successful commit
    rabbitmq_publisher.publish_message(queue_name=RabbitMQ.SMS_QUEUE.value, message=json.dumps(payload))
    
    return {"status": "SMS queued",  "id": db_sms.id}


@router.post("/email")
def trigger_email(info: schemas.CreateEmail, db: Session = Depends(get_db)):
    # TODO: Add validations for request
    db_email = Email(email=info.email, subject=info.subject, message=info.message)
    db.add(db_email)
    db.commit()
    
    idempotency_key = generate_idempotency_key()
    payload = {
        "email_id": db_email.id,
        "email": db_email.email,
        "subject": db_email.subject,
        "message": db_email.message,
        "idempotency_key": idempotency_key
    }
    
    # Now send to RabbitMQ after successful commit
    rabbitmq_publisher.publish_message(queue_name=RabbitMQ.EMAIL_QUEUE.value, message=json.dumps(payload))
    
    return {"status": "Email queued", "id": db_email.id}


