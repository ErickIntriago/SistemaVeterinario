from pydantic import BaseModel




class Receta(BaseModel):
     fecha: str
     indicaciones: str
     medicamento: str
     id_historia: int
     