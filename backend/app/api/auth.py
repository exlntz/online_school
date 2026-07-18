import random
from fastapi import APIRouter, status, BackgroundTasks, HTTPException
from sqlalchemy import select

from backend.app.core.token import create_access_token, create_refresh_token, verify_token
from backend.app.db.models import StudentModel, ParentModel
from backend.app.schemas.auth_schemas import RegisterRequest, VerifyCodeRequest, RefreshTokenRequest
from backend.app.db.database import SessionDep

router = APIRouter(prefix='/auth', tags=['Авторизация'])

def send_mock_sms(phone: str, code: str):
    """Фоновая задача для имитации отправки СМС"""
    print(f"\n{'=' * 40}")
    print(f"Отправка СМС на номер: {phone}")
    print(f"Код подтверждения: {code}")
    print(f"{'=' * 40}\n")
    

@router.post('/send-code', summary='Запрос кода подтверждения для регистрации/входа')
async def request_registration(data: RegisterRequest, background_tasks: BackgroundTasks):
    code = str(random.randint(1000, 9999))
    # await redis.set(f"sms:{data.phone_number}", code, ex=180)
    background_tasks.add_task(send_mock_sms, data.phone_number, code)
    return {
        "status": "success",
        "message": "Код подтверждения отправлен",
        "phone": data.phone_number,
        "role": data.role
    }


@router.post('/verify', summary='Подтверждение кода и создание токенов', status_code=status.HTTP_201_CREATED)
async def verify_registration(session: SessionDep, data: VerifyCodeRequest):
    if data.code != "1111":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Неверный или просроченный код подтверждения"
        )
    
    model_cls = StudentModel if data.role.value == "student" else ParentModel
    query = select(model_cls).where(model_cls.phone_number == data.phone_number)
    result = await session.execute(query)
    user = result.scalar_one_or_none()
    
    if not user:
        if data.role.value == "student":
            user = StudentModel(
                first_name=data.first_name,
                last_name=data.last_name,
                phone_number=data.phone_number
            )
        else:
            user = ParentModel(
                first_name=data.first_name,
                last_name=data.last_name,
                phone_number=data.phone_number
            )
        
        session.add(user)
        await session.commit()
        await session.refresh(user)
    
    token_payload = {
        "sub": str(user.id),
        "role": data.role.value
    }
    
    access_token = create_access_token(data=token_payload)
    refresh_token = create_refresh_token(data=token_payload)
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
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
async def refresh_tokens(data: RefreshTokenRequest, session: SessionDep):
    
    payload = verify_token(data.refresh_token, expected_type="refresh")
    
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
    
    token_payload = {
        "sub": str(user.id),
        "role": role
    }
    
    new_access_token = create_access_token(data=token_payload)
    new_refresh_token = create_refresh_token(data=token_payload)
    
    return {
        "access_token": new_access_token,
        "refresh_token": new_refresh_token,
        "token_type": "bearer"
    }