import { useState } from "react";

const FormAddSubs = ({ setType, setPrice, type, price }) => {
  
  const [error,setError] = useState(false)

  const handleSubs = e => {
    e.preventDefault();
    if (price === "" || Number(price) < 0 || type === ""){
      setError(true)
      return;
    }
    setError(false)
    setType("")
    setPrice("")
    //console.log(type);
    //console.log(price);
  };

  return (
    <div className="add-subscription">
      <h1>Agregar Subscripciones</h1>
      <form onSubmit={handleSubs}>
        <p>Servicio</p>
        <select onChange={(e) => setType(e.target.value)} value={type}>
          <option value="">-- Elegir --</option>
          <option value="netflix">Netflix</option>
          <option value="disney">Disney</option>
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
        <input type="submit" value="Agregar" />
      </form>
      { error ? <p className="error">Campos incorrectos</p> : null}
    </div>
  );
};

export default FormAddSubs;
