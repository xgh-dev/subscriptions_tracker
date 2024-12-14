//definiremos las rutas 
import { Router } from "express";
import userRouter from "./rutas_usuarios.route.js";
import suscripcionRouter from "./rutas_suscripciones.route.js";

//crear el router y dejarlo en una constante para ejecutarlo
const indexRouter = Router()

//prefigo para la api
const prefijoApi = 'subscriptionTracker'

//crear las rutas
indexRouter.get("/",(req,res) => {
    res.send("inicializando el servidor")
})

//muestra de un incializador de rutas
indexRouter.get(`/${prefijoApi}`,(req,res)=>{
    //esta consulta debe ser un get para que no cree interferencia con las concatenaciones
    res.send('Api del proyecto Subscription tracker')
});
indexRouter.use(`/${prefijoApi}`,userRouter);
indexRouter.use(`/${prefijoApi}`,suscripcionRouter);


export default indexRouter;

