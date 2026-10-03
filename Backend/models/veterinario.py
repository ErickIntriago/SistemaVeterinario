from pydantic import BaseModel


class Veterinario(BaseModel):
  
    nombre: str
    especialidad: str
  