from pydantic import BaseModel, EmailStr

class CreateSMS(BaseModel):
    to_: str
    message: str

class CreateEmail(BaseModel):
    to_: EmailStr
    subject: str
    message: str