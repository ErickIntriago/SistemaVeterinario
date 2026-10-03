from fastapi import APIRouter
from database import get_conexion
from models.mascotas import Mascota


router = APIRouter(
    prefix="/mascotas",
    tags=["Mascotas"]  
)

# LISTAR CLIENTES
@router.get("/")
def listar_Mascotas():

    conexion = get_conexion()
    cursor = conexion.cursor()


    cursor.execute(""" SELECT id_mascota,nombre,raza,sexo,fecha_nacimiento,id_cliente FROM Mascota  """)
    clientes=[]
    for fila in cursor.fetchall():
        clientes.append({

            "id_mascota": fila[0],
            "nombre": fila[1],
            "raza": fila[2],
            "sexo": fila[3],
            "fecha_nacimiento": fila[4],
            "id_cliente": fila[5],
            
        

        })
    cursor.close()
    conexion.close()
    return clientes

# RUTAS PARA INSERTAR MASCOTAS
@router.post("/")
def insertar_mascotas(mascota:Mascota):
    try: 
            
            conexionBD = get_conexion()
            cursor = conexionBD.cursor()
            
            cursor.execute(""" INSERT INTO Mascota (nombre,raza,sexo,fecha_nacimiento,id_cliente )VALUES(?,?,?,?,?)""", 
                           mascota.nombre, mascota.raza, mascota.sexo, mascota.fecha_nacimiento, mascota.id_cliente)
            
            conexionBD.commit()
            cursor.close()
            conexionBD.close()
            
            return {"Registro insertado correctamente"}
    
    except Exception as e:
     return {"error": str(e)}
 
 # RUTAS PARA ACTUALIZAR MASCOTAS
@router.put("/{id}")
def actualizar_mascota(id: int, mascota:Mascota):
    try:
       conexionBD=get_conexion()
       cursor=conexionBD.cursor()
       cursor.execute("""UPDATE Mascota SET nombre=?, raza=?, sexo=?, fecha_nacimiento=?, id_cliente=?  WHERE id_mascota=?""",
            mascota.nombre, mascota.raza, mascota.sexo, mascota.fecha_nacimiento, mascota.id_cliente, id
        )
    
       conexionBD.commit()
       filas_afectadas = cursor.rowcount
       cursor.close()
       conexionBD.close()
       
       if filas_afectadas == 0:
           return {"No se encontró ninguna mascota con ID "}
       else:
           return {"Registro actualizado correctamente"}

    except Exception as e:
            return {"Error al actualizar las mascotas"}


@router.delete("/{id}")
def eliminarMascota(id: int):
    try:
        conexionBD= get_conexion()
        cursor= conexionBD.cursor()
        
        cursor.execute("DELETE FROM Mascota WHERE id_mascota=? ", (id,))
        conexionBD.commit()
        filas_afectadas = cursor.rowcount
        cursor.close()
        conexionBD.close()
        
        if filas_afectadas == 0:
           return {"No se encontró ninguna mascota con ID "}
        else:
           return {"Registro eliminado correctamente"}
        
    except Exception as e:
        return{"Error al eliminar la mascota"}
    
        
