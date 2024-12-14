//aqui definiremos las peticiones del cliente web para hacer consultas a la base de datos
import {
  showUsers,
  getUserByID,
  getUserByName,
  modificarSaldo,
  newUser,
} from "../services/usarios.service.js";

export const getUsers = (req, res) => {
  showUsers()//no olvidar agregar () de la funcion
    .then((result) => {
      res.status(200).json({
        message: 'Todos los usuarios',
        data: result[0]
      });
    })
    .catch((err) => {
      res.status(400).send(err)
      console.error("error al mostrar los usuarios", err);
    });
};

export const getUser = async (req, res) => {
  const [user] = await getUserByName(req.params.name);
  res.status(200).send(user); //como la consulta nos genera una lista llamamos a user ya que el primer elemento de la lista es el json que necesitamos
};

export const addNewUser = async (req, res) => {
  const { nombre, saldo } = req.body;
  try {
    await newUser(nombre, saldo);
    res.status(200).send("Usuario creado correctamente");
    //otra forma de crear la consulta y mostrar mediantre el envio de un json
    //const usuario = await newUser(nombre,saldo);
    //res.status(200).json({ message: "Usuario creado correctamente", usuario(esta variable contiene un mensaje que dice "usuario creado correctamente") });
  } catch (error) {
    console.error("Error al crear un usuario", error);
  }
};

export const modicarSaldoDelUsuario = async (req, res) => {
  try {
    const { nombre, saldo } = req.body;
    await modificarSaldo(nombre, saldo);
    res.status(200).send("Cambios realizados en el saldo");
  } catch (error) {
    console.error("error al modificar el saldo del usuario", error);
  }
};
