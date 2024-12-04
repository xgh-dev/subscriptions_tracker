// aqui definiremos las consultas a la base de datos, estas funciones seran utilizadas por App.js que ahi se hacen las consultas https
import mysql from "mysql2";
import dotenv from "dotenv";

//configuraremos el dotenv para conectar las variables de entorno, estos son los datos de conexion a msql
dotenv.config();

///crearemos el pool, para la conexion a la base
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

//request que hacen las consultas, estas request se deben exportar y son asyncronas

export async function showUsers() {
  try {
    const users = await pool.query("SELECT * FROM usuarios");
    //console.log(users);
    return users;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error; // Lanza el error para manejarlo en otro nivel si es necesario
  }
}

export async function newUser(nombre, saldo) {
  try {
    const [usuario] = await pool.query(
      `
                INSERT INTO usuarios(nombre_usuario,saldo) VALUES (?,?)
                `,
      [nombre, saldo]
    );
    return usuario;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getUserByName(name) {
  try {
    const [usuario] = await pool.query(
      `SELECT * FROM usuarios WHERE nombre_usuario=?`,
      [name]
    );
    return usuario;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-lanza el error para manejarlo en otro nivel
  }
}

export async function getUserByID(id) {
  try {
    const [usuario] = await pool.query(`SELECT * FROM usuarios WHERE id=?`, [
      id,
    ]);
    return usuario;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-lanza el error para manejarlo en otro nivel
  }
}

/* export async function createUserOrGetUser(name) {
  try {
    //meteremos un nombre, si este existe nos regresa true y estrae datos de este, si no existe lo crea
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-lanza el error para manejarlo en otro nivel
  }
}
*/

export async function modificarSaldo(nombre, saldo) {
  try {
    await pool.query("UPDATE usuarios SET saldo = ? WHERE nombre_usuario = ?", [
      saldo,
      nombre,
    ]);
    //console.log("funciona")
  } catch (error) {
    console.log(error);
  }
}

export async function agregarSubscripcion(
  nombre_subscripcion,
  precio,
  usuario_id
) {
  try {
    await pool.query(
      `INSERT INTO subscripciones(nombre_subscripcion,precio,usuario_id) VALUES (?,?,?)`,
      [nombre_subscripcion, precio, usuario_id]
    );
    console.log("Suscripción añadida en base de datos");
  } catch (error) {
    console.error(error);
  }
}

export async function mostrarSuscripcionesPorID(id) {
  try {
    const subscripciones = pool.query(
      "SELECT * FROM subscripciones WHERE usuario_id = ?",
      [id]
    );
    return subscripciones;
  } catch (error) {
    console.error(error);
  }
}

export async function eliminarSuscripcion(id){
  try {
    await pool.query("DELETE FROM subscripciones WHERE id = ?",[id])
    console.log('suscripción eliminada')
  } catch (error) {
    console.error('error al eliminar suscripción en la base de datos',error)
  }
}

export async function editarSuscripcion(id,precioNuevo) {
  try {
    await pool.query('UPDATE subscripciones SET precio = ? WHERE id = ? ',[precioNuevo,id])
    console.log("precio de la suscripcion actualizado")
  } catch (error) {
    console.error('error al cambiar el precio de la suscripcion en la base de datos',error)
  }
  
}
