
import SingleItem from "./SingleItem"

const DisplayItems = ({ subs, eliminarItem, editarItem }) => {
    
    return ( 
        <>
            <h2>Subscripciones</h2>
            <div className="suscriptionList">
            {
                subs.map(item => (
                    <SingleItem key={item.id} type={item.nombre_subscripcion} price={item.precio} id={item.id} eliminarItem={eliminarItem} editarItem={editarItem}/>
                ))
            }
            </div>
        </>
    );
}
 
export default DisplayItems;