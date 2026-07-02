from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.db.database import engine
from fastapi.middleware.cors import CORSMiddleware




@asynccontextmanager
async def lifespan(app: FastAPI):
    print('Сервер запущен')
    yield
    print('Сервер остановлен')
    await engine.dispose()






app = FastAPI(
    title='Онлайн школа',
    version='1.0',
    lifespan=lifespan
    )


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get('/', tags=['Система'])
async def check() -> str:
    return 'Сервер запущен'