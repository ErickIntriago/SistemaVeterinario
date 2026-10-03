from fastapi import APIRouter
from database import get_conexion
from models.recetas import Receta



router= ApiRouter(
    prefix="/recetas",
    tags=["Recetas"]
)

