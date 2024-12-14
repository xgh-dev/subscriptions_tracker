//definir los controladores relacionados con las consultas a la tabla suscripciones, los controladores son las funciones que ejecutan la consulta a la base de datos

import { agregarSubscripcion,eliminarSuscripcion,mostrarSuscripcionesPorID,editarSuscripcion } from "../services/suscripciones.service.js";

export const nuevaSuscripcion = async (req,res) => {
    try {
        const {idUsuario,nombreSuscripcion,precio} = req.body;
        await agregarSubscripcion(nombreSuscripcion,precio,idUsuario);
        res.status(200).send('Suscripcion agregada con exito')
    } catch (err) {
        console.error('Error al crear la suscripcion',err)        
    }
}

export const suscripcionesPorId = async (req,res) => {
    try {
        const [suscripciones] = await mostrarSuscripcionesPorID(req.params.id)//como argumento extraemos el parametro id de la liga
        res.status(200).json(suscripciones);
    } catch (error) {
        res.send('Error al extraer las suscripciones')
        console.error('Error al extraer las suscripciones',err)
    }
}

export const editarPrecioSus = async (req,res) => {
    try {
        const {id,precioNuevo} = req.body;
        await editarSuscripcion(id,precioNuevo);
        res.status(200).send('Precio de la suscripcion actualizado')
    } catch (error) {
        
    }
}

export const removerSuscripcion = async (req,res) => {
    try {
        await eliminarSuscripcion(req.params.id);
        res.status(200).send('Suscripcion eliminada')
    } catch (error) {
        res.status(200).send('Error al eliminar la suscripcion')        
    }
}
