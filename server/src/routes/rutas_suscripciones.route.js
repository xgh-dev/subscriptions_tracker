//importar el metodo de router de express para poder definir las rutas y concatenar consultas
import { Router } from "express";
//importar los metodos de las consultas 
import { nuevaSuscripcion,suscripcionesPorId, editarPrecioSus, removerSuscripcion } from "../controllers/suscripciones.controller.js";

//definimos la constante que contendra el metodo router
const suscripcionRouter = Router();

//definimos las consultas
suscripcionRouter.post('/agregarSuscripcion', nuevaSuscripcion)

suscripcionRouter.get('/obternerSuscripcionesPorId/:id', suscripcionesPorId)

suscripcionRouter.put('/editarPrecio', editarPrecioSus)

suscripcionRouter.delete('/eliminarSuscripcion/:id', removerSuscripcion)

//exportamos el medoto router
export default suscripcionRouter;