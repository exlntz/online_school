from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import MappedAsDataclass, DeclarativeBase
from fastapi import Depends
from typing import Annotated
from app.core.config import settings


engine = create_async_engine(url=settings.DATABASE_URL)


new_session = async_sessionmaker(bind=engine, expire_on_commit=False)


class Model(DeclarativeBase, MappedAsDataclass):
    pass

async def get_db():
    async with new_session() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise

SessionDep = Annotated[AsyncSession, Depends(get_db)]