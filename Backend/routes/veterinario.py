from fastapi import APIRouter
from database import get_conexion   
from models.veterinario import Veterinario



router = APIRouter(
    prefix="/veterinario", 
    tags=["Veterinario"]
)

# LISTAR VETERINARIOS
@router.get("/")
def listar_Veterinarios():

    conexion = get_conexion()
    cursor = conexion.cursor()


    cursor.execute(""" SELECT id_veterinario,nombre,especialidad FROM Veterinario  """)
    veterinarios=[]
    for fila in cursor.fetchall():
        veterinarios.append({

            "id_veterinario": fila[0],
            "nombre": fila[1],
            "especialidad": fila[2]
        })
    cursor.close()
    conexion.close()
    return veterinarios

# RUTAS PARA INSERTAR VETERINARIOS
@router.post("/")
def insertar_Veterinario(veterinario:Veterinario):
    try: 
            
            conexionBD = get_conexion()
            cursor = conexionBD.cursor()
            
            cursor.execute(""" INSERT INTO Veterinario(nombre,especialidad )VALUES(?,?)""", 
                           veterinario.nombre, veterinario.especialidad)
            
            conexionBD.commit()
            cursor.close()
            conexionBD.close()
            
            return {"Registro insertado correctamente"}
    
    except Exception as e:
     return {"error": str(e)}
 
 # RUTAS PARA ACTUALIZAR VETERINARIOS
@router.put("/{id}")
def actualizar_Veterinario(id: int, veterinario:Veterinario):
    try:
       conexionBD=get_conexion()
       cursor=conexionBD.cursor()
       cursor.execute("""UPDATE Veterinario SET nombre=?, especialidad=? WHERE id_veterinario=?""",
            veterinario.nombre, veterinario.especialidad, id
        )
    
       conexionBD.commit()
       filas_afectadas = cursor.rowcount
       cursor.close()
       conexionBD.close()
       
       if filas_afectadas == 0:
           return {"No se encontró ningun veterinario con ID "}
       else:
           return {"Registro actualizado correctamente"}

    except Exception as e:
            return {"Error al actualizar los veterinarios"}


@router.delete("/{id}")
def eliminarVeterinario(id: int):
    try:
        conexionBD= get_conexion()
        cursor= conexionBD.cursor()
        
        cursor.execute("DELETE FROM Veterinario WHERE id_veterinario=? ", (id,))
        conexionBD.commit()
        filas_afectadas = cursor.rowcount
        cursor.close()
        conexionBD.close()
        
        if filas_afectadas == 0:
           return {"No se encontró ningun veterinario con ID "}
        else:
           return {"Registro eliminado correctamente"}
        
    except Exception as e:
        return{"Error al eliminar el veterinario"}
    
        

