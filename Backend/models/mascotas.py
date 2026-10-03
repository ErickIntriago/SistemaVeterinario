from pydantic import BaseModel


class Mascota(BaseModel):

    nombre: str
    raza: str
    sexo: str
    fecha_nacimiento: str
    id_cliente: int