from fastapi import APIRouter, Depends, HTTPException
from src.models import models, schemas
from src.core.dbutils import get_db
from src.models.models import SMS, Email
from sqlalchemy.orm import Session


router = APIRouter(
    prefix="/notification",
    tags=["notification"]
)


@router.post("/sms")
def trigger_sms(info: schemas.CreateSMS, db: Session = Depends(get_db)):
    db_sms = SMS(phone=info.phone, message=info.message)
    db.add(db_sms)
    db.commit()
    db.refresh(db_sms)
    
    # Add to RabbitMQ
    
    return {"status": "SMS queued",  "id": db_sms.id}


@router.post("/email")
def trigger_email(info: schemas.CreateEmail, db: Session = Depends(get_db)):
    db_email = Email(email=info.email, subject=info.subject, message=info.message)
    db.add(db_email)
    db.commit()
    db.refresh(db_email)

    # Add to RabbitMQ
    
    return {"status": "Email queued", "id": db_email.id}


