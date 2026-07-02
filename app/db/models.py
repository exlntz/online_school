from sqlalchemy.orm import Mapped, mapped_column
from app.db.database import Model




class StudentModel(Model):
    __tablename__ = 'students'
    
    id: Mapped[int] = mapped_column(primary_key=True, init=False)
    first_name: Mapped[str] = mapped_column()