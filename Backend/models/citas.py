from pydantic import BaseModel

class Cita(BaseModel):

    fecha: str
    motivo: str
    estado: str
    id_mascota: int
    id_veterinario: int