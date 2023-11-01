import os
import json
from flask import Flask, request
from redis import Redis
import mysql.connector

app = Flask(__name__)

redis_host =  "redis-p2-service"
redis_port =  6379
redis = Redis(host=redis_host, port=redis_port)

db_host =  "34.67.54.164"
db_port =  3306
db_user = "root"
db_password = "password"
db_database = "SO1PROYECTO2"


@app.route("/insert", methods=["POST"])
def insert_data():
   # Recibimos los datos del request
    data = json.loads(request.data)

    # Guardamos los datos en Redis
    redis = Redis(host=redis_host, port=redis_port)
    # Creamos la clave en Redis
    key = f"{data['curso']}_{data['semestre']}_{data['year']}"
    if not redis.exists(key):
        redis.set(key, 0)
    # Obtenemos el número de alumnos
    number_of_students = redis.get(key)
    # Actualizamos el número de alumnos
    redis.set(key, int(number_of_students) + 1)

    redis.sadd("semestres", f"{data['semestre']}_{data['year']}")
    redis.sadd("cursos", data["curso"])

    keyRegister = "numeroRegistros"
    if not redis.exists(keyRegister):
        redis.set(keyRegister, 0)
    
    number_of_registers = redis.get(keyRegister)
    redis.set(keyRegister, int(number_of_registers) + 1)

    # Conectamos con la base de datos MySQL
    connection = mysql.connector.connect(
        host=db_host, port=db_port, user=db_user, password=db_password, database=db_database
    )

    # Insertamos los datos en la tabla alumnos
    cursor = connection.cursor()
    query = """INSERT INTO alumno_cursos_calificaciones (carnet, nombre, curso, nota, semestre, año)
              VALUES (%s, %s, %s, %s, %s, %s)"""
    cursor.execute(query, (data["carnet"], data["nombre"], data["curso"], data["nota"], data["semestre"], data["year"]))
    connection.commit()

    cursor.close()
    connection.close()

    return "Registro insertado correctamente"


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port= 3003)
