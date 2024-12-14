//definiremos las rutas 
import { Router } from "express";
import { getUsers,getUser,modicarSaldoDelUsuario,addNewUser } from "../controllers/usuarios.controller.js";

//crear el router y dejarlo en una constante para ejecutarlo
const userRouter = Router()

/*
userRouter.get('/',(req,res) => {
    res.status(200).send('Todos los usuarios')
})
*/

userRouter.get('/usuario_ID',(req,res) => {
    //res.status(200).send('Usuario 27')
    res.status(200).json({'2709':'xavier'})
    //send me manda el valor en texto plano y json me mando el valor en formato json
    //lo ideal es usar .json
})

userRouter.get("/getUsers", getUsers);

userRouter.get("/user/:name", getUser)

userRouter.post("/newUser", addNewUser)

userRouter.put("/modificarSaldo", modicarSaldoDelUsuario)

export default userRouter;