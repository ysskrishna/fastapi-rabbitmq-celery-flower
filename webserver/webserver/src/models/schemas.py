from pydantic import BaseModel, EmailStr

class CreateSMS(BaseModel):
    phone: str
    message: str

class CreateEmail(BaseModel):
    email: EmailStr
    subject: str
    message: str