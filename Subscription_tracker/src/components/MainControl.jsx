import Balance from "./Balance";
import FormAddSubs from "./FormAddSubs";
import DisplayItems from "./DisplayItems";
import { useEffect, useState } from "react";


const MainControl = ({ count, globalUser, globalUserID, actualizarSaldo,agregarSuscripcion,obtenerSuscripcionesPorID, editarPrecioDeSuscripcion, eliminarSuscripcion }) => {
  //guardaremos las subscripciones
  const [subs, setSubs] = useState([]);
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditID] = useState("");
  const [spent, setSpent] = useState(0);

  //funcion que mi filtra y me retorna elementos que sean diferentes al paramatero asignado
  const eliminarItem = (id) => {
    const newList = subs.filter((item) => item.id != id);
    eliminarSuscripcion(id);
    setSubs(newList);
  };
  const editarItem = (id) => {
    subs.forEach((item) => {
      setEditID(id);
      if (item.id == id) {
        setType(item.nombre_subscripcion);
        setPrice(item.precio);
      }
    });
    //console.log("editar item: ",id)
  };
  

  const cargarItems = async() => {
    try {
      const listaSuscripciones = await obtenerSuscripcionesPorID(globalUserID);
      setSubs(listaSuscripciones)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    cargarItems()
  },[globalUserID])
  
  //se puede usar asi si estamos seguros del comportamiento de este, pero se recomienda incluir las dependencias en el array de dependencias para que no solo se ejecute al iniciar el programa
  /*useEffect(() => {
    cargarItems()
  },[globalUserID])*/
  
  return (
    <>
      <div className="main-form">
        <Balance
          count={count}
          subs={subs}
          spent={spent}
          setSpent={setSpent}
          globalUser={globalUser}
          actualizarSaldo={actualizarSaldo}
        />
        <FormAddSubs
          setType={setType}
          setPrice={setPrice}
          type={type}
          price={price}
          setSubs={setSubs}
          subs={subs}
          editId={editId}
          setEditID={setEditID}
          spent={spent}
          setSpent={setSpent}
          count={count}
          globalUserID={globalUserID}
          agregarSuscripcion={agregarSuscripcion}
          cargarItems={cargarItems}
          editarPrecioDeSuscripcion={editarPrecioDeSuscripcion} 
          
        />
      </div>
      <DisplayItems
        subs={subs}
        eliminarItem={eliminarItem}
        editarItem={editarItem}
        cargarItems={cargarItems}
      />
    </>
  );
};
export default MainControl;
