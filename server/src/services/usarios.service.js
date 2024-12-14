//los servicios son las consultas que se hacen a la base de datos, mediante la importación del objeto que realiza la conexion a la base de datos
import pool from "../config/database.js";

//definir las funciones que realizaran las consultas a la base de datos

export function showUsers() {
  //crearemos una consulta con then y cathc
  return new Promise((resolve, reject) => {
    //creamos la constante que guardara la query
    const query = 'SELECT * FROM usuarios';
    pool.execute(query)
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
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

export async function newUser(nombre, saldo) {
  try {
    await pool.query(
      `
                  INSERT INTO usuarios(nombre_usuario,saldo) VALUES (?,?)
                  `,
      [nombre, saldo]
    );
    return "Usuario creado correctamente";
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
