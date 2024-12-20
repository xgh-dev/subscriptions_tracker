import { useState } from "react";

const FormAddSubs = ({
  setType,
  setPrice,
  type,
  price,
  setSubs,
  subs,
  editId,
  setEditID,
  spent,
  setSpent,
  count,
  globalUserID,
  agregarSuscripcion,
  cargarItems,
  editarPrecioDeSuscripcion,
}) => {
  const [error, setError] = useState(false);
  const [errorMoney, setErrorMoney] = useState(false);

  const handleSubs = async (e) => {
    e.preventDefault();
    if (price === "" || Number(price) < 0 || type === "") {
      setError(true);
      return;
    }

    if (count - spent < Number(price)) {
      setErrorMoney(true);
      return;
    }
    setError(false);
    setErrorMoney(false);
    if (editId != "") {
      const newSubs = subs.map((item) => {
        //en este map si usamos return por que si utilizaremos la nueva lista generada por map
        if (item.id === editId) {
          //return { ...item, nombre_subscripcion: type, precio: price }; //tambien se puede usar esta linea de codigo "operador spread (...)"
          item.nombre_subscripcion = type;
          item.precio = price;
          //console.log("precio nuevo",item.precio)
          editarPrecioDeSuscripcion(item.id, item.precio);
        }
        return item;
      });
      setSubs(newSubs);
      setEditID("");
    } else {
      //creamos el objeto que se ira creando y guardando en setSubs
      const data = {
        type: type,
        price: price,
        id: globalUserID,
      };
      //console.log(data.id)
      await agregarSuscripcion(data.id, data.type, data.price);
      //setSubs([...subs,data])
      await cargarItems(); //el await soluciono el renderizado al momento de agregar una nueva suscripcion
    }
    setType("");
    setPrice("");
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
        {editId != "" ? (
          <input type="submit" value="Guardar" />
        ) : (
          <input type="submit" value="Agregar" />
        )}
      </form>
      {error ? <p className="error">Campos incorrectos</p> : null}
      {errorMoney ? (
        <p className="error">No esta en el rango del presupuesto</p>
      ) : null}
    </div>
  );
};

export default FormAddSubs;
