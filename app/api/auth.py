import random
from fastapi import APIRouter, status, BackgroundTasks, HTTPException
from sqlalchemy import select
from app.db.models import StudentModel, ParentModel
from app.schemas.auth_schemas import RegisterRequest, VerifyCodeRequest
from app.db.database import SessionDep

router = APIRouter(prefix='/auth', tags=['Авторизация'])

def send_mock_sms(phone: str, code: str):
    """Фоновая задача для имитации отправки СМС"""
    print(f"\n{'=' * 40}")
    print(f"📱 [MOCK SMS] Отправка СМС на номер: {phone}")
    print(f"🔑 Код подтверждения: {code}")
    print(f"{'=' * 40}\n")
    

@router.post('/get_code', summary='Запрос кода подтверждения для регистрации/входа')
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


@router.post('/verify', summary='Подтверждение кода и создание пользователя', status_code=status.HTTP_201_CREATED)
async def verify_registration(session: SessionDep, data: VerifyCodeRequest):
    if data.code != "1111":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Неверный или просроченный код подтверждения"
        )
    
    model_cls = StudentModel if data.role == "student" else ParentModel
    
    query = select(model_cls).where(model_cls.phone_number == data.phone_number)
    result = await session.execute(query)
    existing_user = result.scalar_one_or_none()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Пользователь с таким номером телефона уже зарегистрирован"
        )
    
    if data.role == "student":
        new_user = StudentModel(
            first_name=data.first_name,
            last_name=data.last_name,
            phone_number=data.phone_number
        )
    else:
        new_user = ParentModel(
            first_name=data.first_name,
            last_name=data.last_name,
            phone_number=data.phone_number
        )
    
    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)  # База подтянет созданный id и created_at
    
    # 4. TODO: В будущем здесь мы будем генерировать и отдавать JWT-токен
    # access_token = create_access_token(data={"sub": new_user.phone_number})
    
    return {
        "status": "success",
        "message": f"Пользователь ({data.role}) успешно зарегистрирован",
        "user": {
            "id": new_user.id,
            "first_name": new_user.first_name,
            "last_name": new_user.last_name,
            "phone_number": new_user.phone_number,
            "created_at": new_user.created_at
        }
    }