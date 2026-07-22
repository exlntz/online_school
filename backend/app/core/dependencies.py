from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import Depends, HTTPException, status
from sqlalchemy import select
from app.core.token import verify_token
from app.db.database import SessionDep
from app.db.models import StudentModel, ParentModel
from typing import Annotated


security = HTTPBearer(auto_error=False)


async def get_current_user(
        session: SessionDep,
        auth: Annotated[HTTPAuthorizationCredentials | None, Depends(security)]
):
    if not auth:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Нужно передать Bearer токен в заголовках!" #TODO норм чето написать потом
        )
    
    token = auth.credentials
    
    # Пытаемся расшифровать токен (функция вернет ошибку, если он протух или подделан)
    payload = verify_token(token, expected_type="access")
    
    user_id = payload.get("sub")
    role = payload.get("role")
    
    if user_id is None or role is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Некорректный токен",
        )
    
    model_cls = StudentModel if role == "student" else ParentModel
    
    # Идем в БД за пользователем
    query = select(model_cls).where(model_cls.id == int(user_id))
    result = await session.execute(query)
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Пользователь не найден",
        )
    
    return user

UserDep = Annotated[StudentModel | ParentModel, Depends(get_current_user)]