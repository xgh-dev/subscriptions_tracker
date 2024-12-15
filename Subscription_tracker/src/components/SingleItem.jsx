import { moneyFormat } from "../helpers";

const SingleItem = ({ type, price, id, eliminarItem, editarItem }) => {
  const urlImage = `/public/imgs/${type}.png`;

  const handleDelete = (e) => {
    e.preventDefault();
    const answer = window.confirm(`Borrar Subscripción a ${type}`);
    if (answer == true) {
      console.log("eliminar item", id);
      //eliminarItem(id);
    }
    //los e.preventDefault son fundamentales para evitar errores y capturar eventos como click
  };
  const handleEdit = (e) => {
    e.preventDefault();
    //console.log("editar item", id);
    editarItem(id);
  };

  return (
    <div className="single-item">
      <img src={urlImage} alt="Services" />
      <h3>Precio: {moneyFormat(Number(price))}</h3>
      <a href="#" className="delete" onClick={handleDelete}>
        Borrar
      </a>
      <a href="#" className="edit" onClick={handleEdit}>
        Editar
      </a>
    </div>
  );
};

export default SingleItem;
