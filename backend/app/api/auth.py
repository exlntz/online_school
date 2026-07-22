import random
from fastapi import APIRouter, status, BackgroundTasks, HTTPException, Cookie, Response
from sqlalchemy import select

from app.core.token import create_access_token, create_refresh_token, verify_token
from app.db.models import StudentModel, ParentModel
from app.db.database import SessionDep
from app.schemas.auth_schemas import SendCodeRequest, UserRegisterRequest, UserLoginRequest

router = APIRouter(prefix='/auth', tags=['Авторизация'])

def send_mock_sms(phone: str, code: str):
    """Фоновая задача для имитации отправки СМС"""
    print(f"\n{'=' * 40}")
    print(f"Отправка СМС на номер: {phone}")
    print(f"Код подтверждения: {code}")
    print(f"{'=' * 40}\n")


def set_auth_cookies_and_tokens(user, role: str, response: Response):
    """Вспомогательная функция, чтобы не дублировать код создания токенов"""
    token_payload = {
        "sub": str(user.id),
        "role": role
    }
    
    access_token = create_access_token(data=token_payload)
    refresh_token = create_refresh_token(data=token_payload)
    
    response.set_cookie(
        key='refresh_token',
        value=refresh_token,
        httponly=True,
        secure=False,  # TODO: на сервере поставить True (HTTPS)
        samesite='lax',
        max_age=60 * 60 * 24 * 60
    )
    return access_token


@router.post('/send-code', summary='Запрос кода подтверждения')
async def request_code(data: SendCodeRequest, background_tasks: BackgroundTasks):
    code = str(random.randint(1000, 9999))
    # await redis.set(f"sms:{data.phone_number}", code, ex=180)
    background_tasks.add_task(send_mock_sms, data.phone_number, code)
    
    return {
        "status": "success",
        "message": "Код подтверждения отправлен",
        "phone": data.phone_number,
        "role": data.role.value
    }


@router.post('/register', summary='Регистрация', status_code=status.HTTP_201_CREATED)
async def register_user(
        session: SessionDep,
        data: UserRegisterRequest,
        response: Response
):
    if data.code != "1111":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Неверный или просроченный код подтверждения"
        )
    
    model_cls = StudentModel if data.role.value == "student" else ParentModel
    query = select(model_cls).where(model_cls.phone_number == data.phone_number)
    result = await session.execute(query)
    
    # 1. Проверяем, нет ли уже такого пользователя
    if result.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Пользователь с таким номером уже существует. Пожалуйста, выполните вход."
        )
    
    # 2. Создаем нового
    user = model_cls(
        first_name=data.first_name,
        last_name=data.last_name,
        phone_number=data.phone_number
    )
    session.add(user)
    await session.commit()
    await session.refresh(user)
    
    # 3. Выдаем токены
    access_token = set_auth_cookies_and_tokens(user, data.role.value, response)
    
    return {
        "message": "Успешная регистрация",
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "phone_number": user.phone_number,
            "role": data.role.value
        }
    }


@router.post('/login', summary='Вход в систему')
async def login_user(
        session: SessionDep,
        data: UserLoginRequest,
        response: Response
):
    if data.code != "1111":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Неверный или просроченный код подтверждения"
        )
    
    model_cls = StudentModel if data.role.value == "student" else ParentModel
    query = select(model_cls).where(model_cls.phone_number == data.phone_number)
    result = await session.execute(query)
    user = result.scalar_one_or_none()
    
    # 1. Проверяем, существует ли пользователь
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Пользователь не найден. Пожалуйста, зарегистрируйтесь."
        )
    
    # 2. Выдаем токены
    access_token = set_auth_cookies_and_tokens(user, data.role.value, response)
    
    return {
        "message": "Успешный вход",
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "phone_number": user.phone_number,
            "role": data.role.value
        }
    }


@router.post('/refresh', summary='Обновление токенов (Refresh)')
async def refresh_tokens(
        session: SessionDep,
        response: Response,
        refresh_token: str | None = Cookie(None, alias='refresh_token')
):
    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh токен отсутствует"
        )
    
    payload = verify_token(refresh_token, expected_type="refresh")
    user_id = payload.get("sub")
    role = payload.get("role")
    
    model_cls = StudentModel if role == "student" else ParentModel
    query = select(model_cls).where(model_cls.id == int(user_id))
    result = await session.execute(query)
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Пользователь не найден или был удален"
        )
    
    new_access_token = set_auth_cookies_and_tokens(user, role, response)
    
    return {
        "access_token": new_access_token,
        "token_type": "bearer"
    }


@router.post('/logout', summary='Выход из системы')
async def logout(response: Response):
    # Сервер дает браузеру команду уничтожить куку
    response.delete_cookie(
        key="refresh_token",
        httponly=True,
        secure=False,  # TODO: на сервере поставить True
        samesite="lax"
    )
    
    return {"message": "Вы успешно вышли из системы"}