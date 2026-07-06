from fastapi.security import OAuth2PasswordBearer
from fastapi import HTTPException, status
import jwt
from datetime import timedelta,datetime,timezone
from app.core.config import settings


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")



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


def verify_refresh_token(token: str) -> str:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Неправильный token type",
                headers={"WWW-Authenticate": "Bearer"},
            )

        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Ошибка token payload")

        return int(user_id)

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Refresh token истек")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Неверный токен")