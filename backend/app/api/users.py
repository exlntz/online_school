from fastapi import APIRouter

from app.core.dependencies import UserDep
from app.db.models import StudentModel

router = APIRouter(prefix='/users', tags=['Пользователи'])


@router.get('/me', summary='Получить данные текущего пользователя')
async def get_my_profile(user: UserDep):
    
    return {
        "id": user.id,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "phone_number": user.phone_number,
        "role": "student" if isinstance(user, StudentModel) else "parent"
    }