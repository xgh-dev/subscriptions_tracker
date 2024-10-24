
const SingleItem = ({ type, price, id }) => {
    const urlImage = `/public/imgs/${type}.png`

    return ( 
        <div className="single-item">
            <img src={urlImage} alt="Services" />
            <h3>Precio: {Number(price)}</h3>
        </div>
    );
}
 
export default SingleItem;