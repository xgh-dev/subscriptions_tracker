CREATE DATABASE subscripcions_tracker;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(255),
    saldo VARCHAR(255) NOT NULL
);

CREATE TABLE tipos_subscripciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_subs VARCHAR(255) NOT NULL,
    costo DECIMAL(10, 2) NOT NULL
);


CREATE TABLE subscripciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    subscripcion_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (subscripcion_id) REFERENCES tipos_subscripciones(id) ON DELETE CASCADE
);

