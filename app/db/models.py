from sqlalchemy.orm import Mapped, mapped_column
from app.db.database import Model
from sqlalchemy import String, DateTime, func, ForeignKey, text
from datetime import datetime


class StudentModel(Model):
    __tablename__ = 'students'
    
    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    first_name: Mapped[str] = mapped_column(String(100))
    last_name: Mapped[str | None] = mapped_column(String(100))
    phone_number: Mapped[str] = mapped_column(String(20), unique=True, index=True)
    curator_id: Mapped[int | None] = mapped_column(ForeignKey('curators.id'), default=None)
    psychologist_id: Mapped[int | None] = mapped_column(ForeignKey('psychologists.id'), default=None)
    parent_id: Mapped[int | None] = mapped_column(ForeignKey('parents.id'), default=None)
    image_url: Mapped[str | None] = mapped_column(String(500), default=None)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), init=False)


class CuratorModel(Model):
    __tablename__ = 'curators'
    
    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    first_name: Mapped[str] = mapped_column(String(100))
    last_name: Mapped[str] = mapped_column(String(100))
    middle_name: Mapped[str] = mapped_column(String(100))
    phone_number: Mapped[str] = mapped_column(String(20), unique=True, index=True)
    tg_username: Mapped[str] = mapped_column(String(100))
    university: Mapped[str] = mapped_column(String(500))
    direction: Mapped[str] = mapped_column(String(500))
    course_number: Mapped[int] = mapped_column()
    math_score: Mapped[int] = mapped_column()
    russ_score: Mapped[int] = mapped_column()
    phys_score: Mapped[int | None] = mapped_column(default=None)
    inf_score: Mapped[int | None] = mapped_column(default=None)
    student_ticket: Mapped[int | None] = mapped_column(default=None)
    role: Mapped[str] = mapped_column(String(50), default='curator', server_default=text("'curator'"))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), init=False)


class PsychologistModel(Model):
    __tablename__ = 'psychologists'
    
    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    first_name: Mapped[str] = mapped_column(String(100))
    last_name: Mapped[str] = mapped_column(String(100))
    middle_name: Mapped[str] = mapped_column(String(100))
    profession: Mapped[str] = mapped_column(String(100))
    phone_number: Mapped[str] = mapped_column(String(20), unique=True, index=True)
    tg_username: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(100))
    education: Mapped[str] = mapped_column(String(100))
    exp_number_years: Mapped[str] = mapped_column(String(50))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), init=False)


class ParentModel(Model):
    __tablename__ = 'parents'
    
    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    first_name: Mapped[str] = mapped_column(String(100))
    last_name: Mapped[str | None] = mapped_column(String(100))
    phone_number: Mapped[str] = mapped_column(String(20), unique=True, index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), init=False)