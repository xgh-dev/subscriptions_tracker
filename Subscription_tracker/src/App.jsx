//import { useState } from 'react'
import "./App.css";
import Header from "./components/Header";
import FormAddMoney from "./components/FormAddMoney";
import MainControl from "./components/MainControl";
import { useState } from "react";

const url = "http://localhost:8080";

function App() {
  const [count, setCount] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [globalUser, setGloblalUser] = useState("");

  async function createUser(nombre, saldo) {
    try {
      await fetch(`${url}/newUser`, {
        method: "POST",
        body: JSON.stringify({ nombre, saldo }),
        headers: { "Content-type": "application/json" },
      });
      return true;
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
      await fetch(`${url}/user/${nombre}/${saldo}`,{
        method:'PUT',
        body: JSON.stringify({nombre,saldo}),
        headers: { "Content-type": "application/json" },
      });
      //return console.log("saldo actualizado");
    } catch (error) {
      console.error(error);
    }
  }

  const component = isValid ? (
    <MainControl
      count={count}
      globalUser={globalUser}
      actualizarSaldo={actualizarSaldo}
    />
  ) : (
    <FormAddMoney
      setCount={setCount}
      setIsValid={setIsValid}
      createUser={createUser}
      getUserByName={getUserByName}
      setGloblalUser={setGloblalUser}
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
