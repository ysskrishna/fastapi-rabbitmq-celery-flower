from fastapi import APIRouter, Depends, HTTPException
from src.models import models, schemas
from src.core.dbutils import get_db
from src.models.models import SMS, Email, Outbox
from src.models.enums import OutboxEventType
from sqlalchemy.orm import Session
import json
from datetime import datetime
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
    
    # Flush to get ID but don't commit yet (keeps transaction open)
    db.flush()
    
    idempotency_key = generate_idempotency_key()
    payload = {
        "sms_id": db_sms.id, 
        "phone": db_sms.phone, 
        "message": db_sms.message,
        "idempotency_key": idempotency_key
    }

    outbox_event = Outbox(
        event_type=OutboxEventType.TRIGGER_SMS.value,
        queue_name=RabbitMQ.SMS_QUEUE.value,
        idempotency_key=idempotency_key,
        payload=json.dumps(payload),
    )
    db.add(outbox_event)
    db.commit()
    
    # Now send to RabbitMQ after successful commit
    rabbitmq_publisher.publish_message(queue_name=RabbitMQ.SMS_QUEUE.value, message=json.dumps(payload))
    
    outbox_event.sent_at = datetime.utcnow()
    db.commit()
    
    return {"status": "SMS queued",  "id": db_sms.id}


@router.post("/email")
def trigger_email(info: schemas.CreateEmail, db: Session = Depends(get_db)):
    # TODO: Add validations for request
    db_email = Email(email=info.email, subject=info.subject, message=info.message)
    db.add(db_email)
    
    # Flush to get ID but don't commit yet (keeps transaction open)
    db.flush()
    
    idempotency_key = generate_idempotency_key()
    payload = {
        "email_id": db_email.id,
        "email": db_email.email,
        "subject": db_email.subject,
        "message": db_email.message,
        "idempotency_key": idempotency_key
    }
    
    outbox_event = Outbox(
        event_type=OutboxEventType.TRIGGER_EMAIL.value,
        queue_name=RabbitMQ.EMAIL_QUEUE.value,
        idempotency_key=idempotency_key,
        payload=json.dumps(payload),
    )
    db.add(outbox_event)
    db.commit()
    
    # Now send to RabbitMQ after successful commit
    rabbitmq_publisher.publish_message(queue_name=RabbitMQ.EMAIL_QUEUE.value, message=json.dumps(payload))
    
    outbox_event.sent_at = datetime.utcnow()
    db.commit()
    
    return {"status": "Email queued", "id": db_email.id}


