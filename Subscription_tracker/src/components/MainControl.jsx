import { useState } from "react";
import Balance from "./Balance";
import FormAddSubs from "./FormAddSubs";
import DisplayItems from "./DisplayItems";

const MainControl = ({ count }) => {
  //guardaremos las subscripciones
  const [subs, setSubs] = useState([])
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [editId,setEditID] = useState("");
  const [spent,setSpent] = useState(0)

  const eliminarItem = id => {
    const newList = subs.filter(item => item.id != id);
    setSubs(newList)
  }
  const editarItem = id => {
    subs.map(item => {
      setEditID(id)
      if (item.id == id){
        setType(item.type)
        setPrice(item.price)
      }
    })
  }

  return (
    <>
      <div className="main-form">
        <Balance count={count} subs={subs} spent={spent} setSpent={setSpent}/>
        <FormAddSubs
          setType={setType}
          setPrice={setPrice}
          type={type}
          price={price}
          setSubs={setSubs}
          subs = {subs}
          editId={editId}
          setEditID={setEditID}
          spent={spent}
          setSpent={setSpent}
          count={count}
        />
      </div>
      <DisplayItems subs={subs} eliminarItem={eliminarItem} editarItem={editarItem}/>
    </>
  );
};
export default MainControl;
