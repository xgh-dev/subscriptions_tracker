//import { useState } from 'react'
import "./App.css";
import Header from "./components/Header";
import FormAddMoney from "./components/FormAddMoney";
import MainControl from "./components/MainControl";
import { useEffect, useState } from "react";

const url = "http://localhost:8080";

function App() {
  const [count, setCount] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [globalUser, setGloblalUser] = useState("");
  const [globalUserID, setGloblalUserID] = useState("");
  

  async function createUser(nombre, saldo) {
    try {
      await fetch(`${url}/newUser`, {
        method: "POST",
        body: JSON.stringify({ nombre, saldo }),
        headers: { "Content-type": "application/json" },
      });
      return true
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function getUserByName(name) {
    try {
      const response = await fetch(`${url}/user/${name}`);
      const usuario = await response.json();
      //console.log(usuario); //imprimimos la consulta
      //console.log(usuario.nombre_usuario) //imprimimos un dato exacto de la consulta
      return usuario;
    } catch (error) {
      console.error(error);
    }
  }

  async function actualizarSaldo(nombre, saldo) {
    try {
      await fetch(`${url}/modificarSaldo`,{
        method:'PUT',
        body: JSON.stringify({nombre,saldo}),
        headers: { "Content-type": "application/json" },
      });
      //return console.log("saldo actualizado");
    } catch (error) {
      console.error(error);
    }
  }

  async function agregarSuscripcion(idUsuario,nombreSuscripcion,precio) {
    try {
      await fetch(`${url}/agregarSuscripcion`,{
        method:'POST',
        body: JSON.stringify({idUsuario,nombreSuscripcion,precio}),
        headers: { "Content-type": "application/json" },
      })
      return true
    } catch (error) {
      console.error('Error en la consulta agregarSuscripción',error)
    }
  }

  async function obtenerSuscripcionesPorID(id) {
    if (id != ''){
      try {
        const response = await fetch(`${url}/obternerSuscripcionesPorId/${id}`)
        const suscripciones = await response.json();
        //console.log([suscripciones])
        return suscripciones;
      } catch (error) {
        console.error('error al obtener consultas',error)
      }
    }
  }

  async function editarPrecioDeSuscripcion(id,precioNuevo) {
    try {
      await fetch(`${url}/editarPrecio`,{
        method: 'PUT',
        body: JSON.stringify({id,precioNuevo}),
        headers: { "Content-type": "application/json" },
      })
      console.log("cambio realizado")
    } catch (error) {
      console.error("error en editar el item",error)
    }
  }
  
  async function eliminarSuscripcion(id) {
    try {
      await fetch(`${url}/eliminarSuscripcion/${id}`,{
        method: 'DELETE'//si no especificamos el metodo marcara error, si no se especifica es un get
      
      })
      console.log("suscripcion eliminada")
    } catch (error) {
      console.error("error en editar el item",error)
    }
  }
  
/*
  useEffect(() => {
    try {
      if (globalUserID != ""){
        obtenerSuscripcionesPorID(globalUserID);
      }
    } catch (error) {
      console.log('error en la obtencion de suscripciones',error)
    }
  },[globalUserID]);*/

  const component = isValid ? (
    <MainControl
      count={count}
      globalUser={globalUser}
      globalUserID={globalUserID}
      actualizarSaldo={actualizarSaldo}
      agregarSuscripcion={agregarSuscripcion}
      obtenerSuscripcionesPorID={obtenerSuscripcionesPorID}
      editarPrecioDeSuscripcion = {editarPrecioDeSuscripcion}
      eliminarSuscripcion = {eliminarSuscripcion}
    />
  ) : (
    <FormAddMoney
      setCount={setCount}
      setIsValid={setIsValid}
      createUser={createUser}
      getUserByName={getUserByName}
      setGloblalUser={setGloblalUser}
      setGloblalUserID={setGloblalUserID}
      actualizarSaldo={actualizarSaldo}
    />
  );

  return (
    <div className="App">
      <Header />
      {component}
    </div>
  );
}

export default App;
