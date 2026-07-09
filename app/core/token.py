from fastapi.security import OAuth2PasswordBearer
from fastapi import HTTPException, status
import jwt
from datetime import timedelta,datetime,timezone
from app.core.config import settings


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/verify")



def create_token(data: dict, expires_delta: timedelta, token_type: str):

    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({
        "iat": datetime.now(timezone.utc),
        "exp": expire,
        "type": token_type,
    })
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def create_access_token(data: dict):
    return create_token(
        data=data,
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
        token_type="access"
    )

def create_refresh_token(data: dict):
    return create_token(
        data=data,
        expires_delta=timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
        token_type="refresh"
    )


def verify_token(token: str, expected_type: str) -> dict:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        if payload.get("type") != expected_type:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Неправильный тип токена. Ожидался {expected_type}",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        if payload.get("sub") is None or payload.get("role") is None:
            raise HTTPException(status_code=401, detail="Ошибка payload: нет sub или role")
        
        return payload
    
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Токен истек")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Неверный или поврежденный токен")
    
    
