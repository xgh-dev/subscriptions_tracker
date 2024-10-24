import { useState } from "react";

const FormAddSubs = ({ setType, setPrice, type, price, setSubs, subs, editId, setEditID, spent, setSpent, count}) => {
  
  const [error,setError] = useState(false)
  const [errorMoney,setErrorMoney] = useState(false)

  const handleSubs = e => {
    e.preventDefault();
    if (price === "" || Number(price) < 0 || type === ""){
      setError(true)
      return;
    }
    //
    if (count - spent < Number(price)){
        setErrorMoney(true)
        return;
    }
    setError(false)
    setErrorMoney(false)
    if (editId != ""){
      setEditID("");
      const newSubs = subs.map(item => {
        if (item.id === editId){
          if (item.id === editId){
            item.type = type;
            item.price = price;
          }
        }
        return item
      })
      setSubs(newSubs);
    } else {
      //creamos el objeto que se ira creando y guardando en setSubs
        const data = {
          type:type,
          price:price,
          id:Date.now()
        }
        setSubs([...subs,data])  
    }
    setType("")
    setPrice("")

  };

  return (
    <div className="add-subscription">
      <h1>Agregar Subscripciones</h1>
      <form onSubmit={handleSubs}>
        <p>Servicio</p>
        <select onChange={(e) => setType(e.target.value)} value={type}>
          <option value="">-- Elegir --</option>
          <option value="netflix">Netflix</option>
          <option value="disneyPlus">Disney</option>
          <option value="hboMax">HBO</option>
          <option value="starPlus">Star Plus</option>
          <option value="primeVideo">Prime Video</option>
          <option value="spotify">Spotify</option>
          <option value="appletv">Apple tv</option>
        </select>
        <p>Cantidad</p>
        <input
          type="number"
          placeholder="20$"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
        {editId != "" ? <input type="submit" value="Guardar"/>:<input type="submit" value="Agregar"/> }
      </form>
      { error ? <p className="error">Campos incorrectos</p> : null}
      { errorMoney ? <p className="error">No esta en el rango del presupuesto</p> : null}
    </div>
  );
};

export default FormAddSubs;
