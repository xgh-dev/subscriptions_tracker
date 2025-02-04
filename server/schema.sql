CREATE DATABASE subscripcions_tracker;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(255),
    saldo VARCHAR(255) NOT NULL
);


CREATE TABLE subscripciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_subscripcion VARCHAR(255),
    precio VARCHAR(255),
    usuario_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

