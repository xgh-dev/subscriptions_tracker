import { moneyFormat } from "../helpers";

const SingleItem = ({ type, price, id }) => {
    const urlImage = `/public/imgs/${type}.png`

    return ( 
        <div className="single-item">
            <img src={urlImage} alt="Services" />
            <h3>Precio: {moneyFormat(Number(price))}</h3>
            <a href="">Borrar</a>
            <a href="">Editar</a>
        </div>
    );
}
 
export default SingleItem;