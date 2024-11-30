from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import declarative_mixin
from src.core.dbutils import Base


@declarative_mixin
class Timestamp:
    created_at = Column(DateTime, default=func.now(), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), server_default=func.now(), onupdate=func.now(), nullable=False)


class SMS(Timestamp, Base):
    __tablename__ = "sms"


    id = Column(Integer, primary_key=True, index=True)
    phone = Column(String, index=True)
    message = Column(Text)

class Email(Timestamp, Base):
    __tablename__ = "email"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True)
    subject = Column(String)
    message = Column(Text)

class Outbox(Timestamp, Base):
    __tablename__ = "outbox"

    id = Column(Integer, primary_key=True, index=True)
    event_type = Column(String, nullable=False)
    payload = Column(Text, nullable=False)
    sent_at = Column(DateTime, nullable=True)