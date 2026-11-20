from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, model_validator

class UserBase(BaseModel):
    email: EmailStr

class UserRegister(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Full name of user")
    email: EmailStr = Field(..., description="Valid corporate or personal email")
    password: str = Field(..., min_length=8, max_length=128, description="Strong password minimum 8 chars")
    confirm_password: str = Field(..., min_length=8, max_length=128)

    @model_validator(mode="after")
    def passwords_match(self):
        if self.password != self.confirm_password:
            raise ValueError("Passwords do not match.")
        return self

class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=1)
    remember_me: Optional[bool] = False

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str = Field(..., min_length=1)
    new_password: str = Field(..., min_length=8, max_length=128)
    confirm_password: str = Field(..., min_length=8, max_length=128)

    @model_validator(mode="after")
    def passwords_match(self):
        if self.new_password != self.confirm_password:
            raise ValueError("New passwords do not match.")
        return self

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    created_at: datetime

    class Config:
        from_attributes = True

class AuthResponse(BaseModel):
    status: str
    message: str
    user: UserResponse
    access_token: Optional[str] = None

class MessageResponse(BaseModel):
    status: str
    message: str
    reset_token: Optional[str] = None

