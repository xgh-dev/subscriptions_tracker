import express from "express";
import {
    showUserCount,
    showUsers,
} from "./database.js"

import cors from "cors";

// definimos los atributos del cors

const corseOptions = {
    origin: ["127.0.0.1:3306","http://localhost:5173/"],
    methos: ["POST","GET"],
    credentials: true
    
}

//definimos la funcion que contenga el metodo de express, este metodo se encargara de ejecutar y leer las llamadas a la api
const app = express();
//deinimos los tipos de datos que queremos escuchar, este caso tipo json
app.use(express.json())

app.use(cors(corseOptions));

//definimos las consultas 
// mediante app y el metodo que queremos
app.get("/users", async (req,res) => {
    const users = await showUsers();
    res.status(200).send(users) 
})

app.get("/user/:id", async (req,res) => {
    const userById = await showUserCount(req.params.id);
    res.status(200).send(userById);
})


app.listen(8080, () => {
    console.log("Server running on port 8080");
  });