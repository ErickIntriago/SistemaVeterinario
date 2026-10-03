from fastapi import FastAPI
from routes import veterinario
from routes import mascotas
from routes import cliente
from fastapi.middleware.cors import CORSMiddleware
 

app = FastAPI(
    title="Sistema Veterinaria"
)


app.include_router(cliente.router)
app.include_router(mascotas.router)
app.include_router(veterinario.router)


from fastapi.middleware.cors import CORSMiddleware


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)