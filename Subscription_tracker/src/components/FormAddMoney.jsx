import { useState } from "react";

const FormAddMoney = ({
  setCount,
  setIsValid,
  createUser,
  getUserByName,
  setGloblalUser,
  setGloblalUserID,
  actualizarSaldo,
}) => {
  const [inputSaldo, setInputSaldo] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputLogin, setInputLogin] = useState("");
  const [inputMasSaldo, setInputMasSaldo] = useState("");
  const [error, setError] = useState(false);

  const handleForm = async(e) => {
    e.preventDefault();
    if (inputSaldo === "" || Number(inputSaldo) < 0 || inputName === "") {
      setError(true);
      return;
    }
    setError(false);
    try {
      await createUser(inputName,inputSaldo);
      const login = await getUserByName(inputName);
      //console.log(login.id)
      setGloblalUserID(login.id)
      setGloblalUser(login.nombre_usuario);
      setCount(Number(login.saldo));
    } catch (error) {
      console.log('error en el ingreso de usuario',error)
    }
    setIsValid(true);
    //setCount(Number(inputSaldo));
    //setIsValid(createUser(inputName, inputSaldo));
    //console.log(input);
  };
  
  const handleFormLogin = async (e) => {
    //en esta funcion como manejamos consultas que esperan datos y que de estos datos dependen variables en el codigo, debemos definirla como una funcion asincrona y la consulta a la api debe estar acompañada por un await
    e.preventDefault();
    if (inputLogin === "") {
      setError(true);
      return;
    }
    setError(false);
    try {
      const login = await getUserByName(inputLogin);
      //console.log(login.id)
      setGloblalUserID(login.id)
      setGloblalUser(login.nombre_usuario);
      if (inputMasSaldo === "") {
        setCount(Number(login.saldo));
      } else if (inputMasSaldo !== "") {
        const saldoNuevo = Number(login.saldo) + Number(inputMasSaldo);
        await actualizarSaldo(inputLogin,saldoNuevo)
        setCount(saldoNuevo)
      }
      setIsValid(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="form-add-money">
        <div className="form-container">
        <form onSubmit={handleForm} className='form crear_usuario'>
          <p>Crear Usuario</p>
          <input
            type="text"
            placeholder="usuario"
            onChange={(e) => setInputName(e.target.value)}
          />
          <p>Agregar Presupuesto</p>
          <input
            type="number"
            placeholder="$$$"
            onChange={(e) => setInputSaldo(e.target.value)}
          />
          <input type="submit" value="Agregar" />
        </form>
        <form onSubmit={handleFormLogin}  className='form ingresar_usuario'>
          <p>Ingresar usuario</p>
          <input
            type="text"
            placeholder="Usuario existente"
            onChange={(e) => setInputLogin(e.target.value)}
          />
          <p>Ingresar saldo</p>
          <input
            type="number"
            placeholder="Ingresar más saldo"
            onChange={(e) => setInputMasSaldo(e.target.value)}
          />
          <input type="submit" value="Ingresar" />
        </form>
        </div>
      </div>
      {error ? <p className="error">Uno o mas datos es invalido</p> : null}
    </>
  );
};

export default FormAddMoney;
