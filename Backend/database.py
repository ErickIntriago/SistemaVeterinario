import pyodbc


server = 'KATHERINE'
database = 'Veterinaria'
username = 'sa'
password = '2300536568'
driver = '{SQL Server}'


def get_conexion():

    conexion = pyodbc.connect(
        f'DRIVER={driver};'
        f'SERVER={server};'
        f'DATABASE={database};'
        f'UID={username};'
        f'PWD={password}'
    )

    return conexion


print("Probando conexión...")

try:
    conexion = get_conexion()
    print("Conexión exitosa a Veterinaria")
    conexion.close()

except Exception as e:
    print("Error de conexión:")
    print(e)