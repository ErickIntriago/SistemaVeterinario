from pydantic import BaseModel


class Cliente(BaseModel):

    cedula: str
    nombre: str
    apellido: str
    telefono: str
    direccion: str
    correo: str