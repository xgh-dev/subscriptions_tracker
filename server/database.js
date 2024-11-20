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
  const [user] = await pool.query("SELECT * FROM usuarios");
  //console.log(user)
  return user;
}

export async function showUserCount(UserId) {
  try {
    const [data] = await pool.query(
      `
            SELECT subscripciones.id, subscripciones.nombre_subs, subscripciones.saldo, usuarios.nombre_usuario 
            FROM subscripciones 
            JOIN usuarios ON subscripciones.usuario_id = usuarios.id 
            WHERE usuarios.id = ?
        `,
      [UserId]
    ); // El ID se pasa como parámetro de la consulta para evitar inyecciones SQL.
    return data; // Retornamos los datos obtenidos
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Lanzamos el error para manejarlo desde el llamado de la función
  }
}
/* resultado de consulta showUserCount
[
    {
        "id": 1,
        "name": "Subscripción Básica",
        "saldo": 100.50,
        "name": "Juan Pérez"
    },
    {
        "id": 2,
        "name": "Subscripción Premium",
        "saldo": 250.00,
        "name": "Juan Pérez"
    }
]
esta consulta nos regresa todos los datos que pertenecen al id
*/

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
    const [usuario] = await pool.query(`SELECT * FROM usuarios WHERE nombre_usuario=?`,[name]);
    return usuario
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-lanza el error para manejarlo en otro nivel
  }  
}
export async function getUserByID(id) {
  try {
    const [usuario] = await pool.query(`SELECT * FROM usuarios WHERE id=?`,[id]);
    return usuario
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

export async function addKindOfSubscriptions(nombre,costo) {
  try {
    const [subscripcion] = await pool.query(`INSERT INTO tipos_subscripciones(nombre_subs,costo) VALUES (?,?)`,[nombre,costo]);
    return subscripcion;   
  } catch (error) {
    console.error(error)
    throw error;
  }
}

export async function subscripcionPorUsuario(id_usuario,id_subs) {
  try {
    const [relacion] = await pool.query(`INSERT INTO subscripciones(usuario_id,
    subscripcion_id) VALUES (?,?)`,[id_usuario,id_subs])
    return relacion;    
  } catch (error) {
    console.error(error)
  }
}

export async function modificarSaldo(nombre,saldo) {
  try {
    await pool.query('UPDATE Usuarios SET saldo = ? WHERE nombre_usuario = ?',[saldo,nombre]);
    //console.log("funciona")
  } catch (error) {
    console.log(error)
  }
  
}
