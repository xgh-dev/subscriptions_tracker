//para levantar el servidor debemos posicionarnos en la carpeta server y escribir el siguiente comando npm run dev

import express from "express";
import indexRouter from "./routes/index.route.js";

import cors from "cors";
// definimos los atributos del cors

const corseOptions = {
    //origin: ["127.0.0.1:3306","http://localhost:5173/"],
    origin: "*", //asi permitiremos cualquier origen
    methods: ["POST","GET","DELETE","PUT"],
    credentials: true
    
}

//definimos la funcion que contenga el metodo de express (middleware), este metodo se encargara de ejecutar y leer las llamadas a la api
const app = express(); //este es el middleware y es lo mas importante para que expres funciones

//definimos la consulta que nos setea el puerto del servidor puede ser el que capturemos con la variable de enorno o el indicado
app.set("port",process.env.PORT || 8080);

//deinimos los tipos de datos que queremos escuchar, este caso tipo json
app.use(express.json())

app.use(cors(corseOptions));

//con esta consulta comprobamos que el servidor funciona
app.use('/',indexRouter);

//ruta que nos indica que la ruta no esta definida
app.use('*',(req,res)=>{
    res.send('ruta no definida')
})

// mediante app y el metodo que queremos
/*
app.get("/users", async (req,res) => {
    const [users] = await showUsers();
    res.status(200).send(users) 
})
app.get("/user/:name", async (req,res) => {
    const [user] = await getUserByName(req.params.name);
    res.status(200).send(user)//como la consulta nos genera una lista llamamos a user ya que el primer elemento de la lista es el json que necesitamos
})
app.post("/newUser", async (req,res) => {
    const {nombre, saldo} = req.body;
    //const usuario = await newUser(nombre,saldo);
    await newUser(nombre,saldo);    
    res.status(200).send("Usuario creado correctamente")
    //res.status(200).json({ message: "Usuario creado correctamente", usuario });

})
app.put("/modificarSaldo", async (req,res) => {
    const {nombre,saldo} = req.body;
    await modificarSaldo(nombre,saldo)
    res.status(200).send("Cambios realizados en el saldo")
})
*/
/*
app.post('/agregarSuscripcion', async (req,res) => {
    const {idUsuario,nombreSuscripcion,precio} = req.body;
    await agregarSubscripcion(nombreSuscripcion,precio,idUsuario)
    res.status(200).send('Suscripción creada con exito')
})
app.get('/obternerSuscripcionesPorId/:id', async (req,res) => {
    const [suscripciones] = await mostrarSuscripcionesPorID(req.params.id)
    //console.log(suscripciones)
    res.status(200).send(suscripciones);
})
app.put('/editarPrecio',async (req,res) => {
    //destructuramos y extraemos los datos del endpoint
    const {id,precioNuevo} = req.body;
    await editarSuscripcion(id,precioNuevo);
    res.status(200).send('Precio actualizado')
})
app.delete('/eliminarSuscripcion/:id', async (req,res) => {
    const id = req.params.id;
    await eliminarSuscripcion(id)
    res.status(200).send('Suscripcion eliminada')
})*/

//llamamos a la variable que seteamos para poder iniciar el servidor
app.listen(app.get('port'), () => {
    console.log("Server running on port: ",app.get('port'));
  });