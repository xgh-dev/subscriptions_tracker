//aqui definiremos los serviciones relacionados con las suscripciones, estas son las consultas que se hacen la base de datos 
import pool from "../config/database.js";

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