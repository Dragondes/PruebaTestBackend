CREATE DATABASE usuarios_database;


CREATE TABLE usuario(
    usuario_id SERIAL PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    nickname VARCHAR(255),
    contraseña VARCHAR(255)
);