from sqlalchemy.orm import Mapped, mapped_column
from backend.app.db.database import Model
from sqlalchemy import String, DateTime, func, ForeignKey, text, Text
from datetime import datetime
from enum import Enum


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


class SubjectEnum(str, Enum):
    math = "math"
    physics = "physics"
    russian = "russian"
    informatics = "informatics"


class TaskModel(Model):
    __tablename__ = 'tasks'
    
    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    subject: Mapped[SubjectEnum] = mapped_column(index=True)
    topic: Mapped[str] = mapped_column(String(200), index=True)
    task_number: Mapped[int] = mapped_column()
    difficulty: Mapped[str] = mapped_column(String(50))
    part: Mapped[int] = mapped_column()
    content: Mapped[str] = mapped_column(Text)
    source: Mapped[str | None] = mapped_column(String(200),default=None, index=True) # Пересдача 08.07.2026
    sub_topic: Mapped[str | None] = mapped_column(String(200), default=None, index=True)
    image_url: Mapped[str | None] = mapped_column(String(500), default=None)
    answer: Mapped[str | None] = mapped_column(String(255), default=None)
    max_score: Mapped[int] = mapped_column(default=1)
    is_auto_check: Mapped[bool] = mapped_column(default=True, server_default=text('true'))
    solution_text: Mapped[str | None] = mapped_column(Text, default=None)
    solution_video_url: Mapped[str | None] = mapped_column(String(500), default=None)
    is_active: Mapped[bool] = mapped_column(default=True, server_default=text('true'))
    creator_id: Mapped[int | None] = mapped_column(ForeignKey('curators.id'), default=None)  # Кто создал
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), init=False)
    updated_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), onupdate=func.now(), default=None)