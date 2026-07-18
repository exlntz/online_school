from pydantic import BaseModel, field_validator
from enum import Enum
import re


class RoleEnum(str, Enum):
    student = 'student'
    parent = 'parent'

class RegisterRequest(BaseModel):
    first_name: str
    last_name: str | None = None
    phone_number: str
    role: RoleEnum
    
    @field_validator('phone_number')
    @classmethod
    def clean_phone(cls, value: str) -> str:
        cleaned = re.sub(r'[^\d+]', '' , value)
        
        if not cleaned.startswith('+') or len(cleaned) < 11:
            raise ValueError("Номер телефона должен начинаться с '+' и содержать код страны (например, +79991234567)")
        return cleaned

class VerifyCodeRequest(BaseModel):
    phone_number: str
    code: str
    first_name: str
    last_name: str | None = None
    role: RoleEnum

    @field_validator("phone_number")
    @classmethod
    def clean_phone(cls, value: str) -> str:
        cleaned = re.sub(r"[^\d+]", "", value)
        if not cleaned.startswith("+") or len(cleaned) < 11:
            raise ValueError("Номер телефона должен начинаться с '+' и содержать код страны (например, +79991234567)")
        return cleaned
    
class RefreshTokenRequest(BaseModel):
    refresh_token: str