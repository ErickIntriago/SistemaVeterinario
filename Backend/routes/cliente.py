from fastapi import APIRouter
from database import get_conexion
from models.cliente import Cliente


router = APIRouter(
    prefix="/clientes",
    tags=["Clientes"]
)



# LISTAR CLIENTES
@router.get("/")
def listar_clientes():

    conexion = get_conexion()
    cursor = conexion.cursor()


    cursor.execute(""" SELECT id_cliente,cedula,nombre,apellido,telefono,direccion,correo FROM Cliente """)
    clientes=[]
    for fila in cursor.fetchall():
        clientes.append({

            "id_cliente": fila[0],
            "cedula": fila[1],
            "nombre": fila[2],
            "apellido": fila[3],
            "telefono": fila[4],
            "direccion": fila[5],
            "correo": fila[6]

        })
    cursor.close()
    conexion.close()
    return clientes


@router.post("/")
def insertar_cliente(cliente:Cliente):
    try: 
            
            conexionBD = get_conexion()
            cursor = conexionBD.cursor()
            
            cursor.execute(""" INSERT INTO Cliente (cedula,nombre,apellido,telefono,direccion,correo )VALUES(?,?,?,?,?,?)""", 
                           cliente.cedula, cliente.nombre, cliente.apellido, cliente.telefono, cliente.direccion, cliente.correo)
            
            conexionBD.commit()
            cursor.close()
            conexionBD.close()
            
            return {"Registro insertado correctamente"}
    
    except Exception as e:
     return {"error": str(e)}
 
@router.put("/{id}")
def actualizar_cliente(id: int, cliente:Cliente):
    try:
       conexionBD=get_conexion()
       cursor=conexionBD.cursor()
       cursor.execute("""UPDATE cliente SET nombre=?, apellido=?, telefono=?, direccion=?, correo=?  WHERE id_cliente=?""",
            cliente.nombre, cliente.apellido, cliente.telefono, cliente.direccion, cliente.correo, id
        )
    
       conexionBD.commit()
       filas_afectadas = cursor.rowcount
       cursor.close()
       conexionBD.close()
       
       if filas_afectadas == 0:
           return {"No se encontró ninguna persona con ID "}
       else:
           return {"Registro actualizado correctamente"}

    except Exception as e:
            return {"Error al actualizar las personas"}


@router.delete("/{id}")
def eliminarCliente(id: int):
    try:
        conexionBD= get_conexion()
        cursor= conexionBD.cursor()
        
        cursor.execute("DELETE FROM Cliente WHERE id_cliente=? ", (id,))
        conexionBD.commit()
        filas_afectadas = cursor.rowcount
        cursor.close()
        conexionBD.close()
        
        if filas_afectadas == 0:
           return {"No se encontró ninguna persona con ID "}
        else:
           return {"Registro eliminado correctamente"}
        
    except Exception as e:
        return{"Error al eliminar la persona"}
    
        
