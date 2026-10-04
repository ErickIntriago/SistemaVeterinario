from fastapi import APIRouter
from database import get_conexion
from models.citas import Cita



router= APIRouter(
    prefix="/citas",
    tags=["Citas"]
)


@router.get("/")
def listar_citas():

    conexion = get_conexion()
    cursor = conexion.cursor()


    cursor.execute(""" SELECT id_cita,fecha,motivo,estado,id_mascota,id_veterinario FROM Cita  """)
    citas=[]
    for fila in cursor.fetchall():
        citas.append({

            "id_cita": fila[0],
            "fecha": fila[1],
            "motivo": fila[2],
            "estado": fila[3],
            "id_mascota": fila[4],
            "id_veterinario": fila[5]
        })
    cursor.close()
    conexion.close()
    return citas


@router.post("/")
def insertar_cita(cita:Cita):
    try: 
            
            conexionBD = get_conexion()
            cursor = conexionBD.cursor()
            
            cursor.execute(""" INSERT INTO Cita (fecha,motivo,estado,id_mascota,id_veterinario )VALUES(?,?,?,?,?)""", 
                           cita.fecha, cita.motivo, cita.estado, cita.id_mascota, cita.id_veterinario)
            
            conexionBD.commit()
            cursor.close()
            conexionBD.close()
            
            return {"Registro insertado correctamente"}
    
    except Exception as e:
     return {"error": str(e)}
 
@router.put("/{id}")
def actualizar_cita(id: int, cita:Cita):
    try:
       conexionBD=get_conexion()
       cursor=conexionBD.cursor()
       cursor.execute("""UPDATE Cita SET fecha=?, motivo=?, estado=?, id_mascota=?, id_veterinario=? WHERE id_cita=?""",
            cita.fecha, cita.motivo, cita.estado, cita.id_mascota, cita.id_veterinario, id)
       
       conexionBD.commit()
       cursor.close()
       conexionBD.close()
       
       return {"Registro actualizado correctamente"}
    
    except Exception as e:
     return {"error": str(e)}
 
 
@router.delete("/{id}")
def eliminar_cita(id: int):
    try:
       conexionBD=get_conexion()
       cursor=conexionBD.cursor()
       cursor.execute("""DELETE FROM Cita WHERE id_cita=?""", (id,))
       
       conexionBD.commit()
       cursor.close()
       conexionBD.close()
       
       return {"Registro eliminado correctamente"}
    
    except Exception as e:
     return {"error": str(e)}
 