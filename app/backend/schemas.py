from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class WaitlistSignupCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None

class WaitlistSignupResponse(BaseModel):
    id: int
    name: str
    email: str
    company: Optional[str]
    is_active: bool
    email_sent: bool
    created_at: datetime
    
    class Config:
        from_attributes = True
