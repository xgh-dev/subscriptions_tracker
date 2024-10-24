import SingleItem from "./SingleItem"

const DisplayItems = ({ subs, eliminarItem, editarItem }) => {
    return ( 
        <>
            <h2>Subscripciones</h2>
            {
                subs.map(item => (
                    <SingleItem key={item.id} type={item.type} price={item.price} id={item.id} eliminarItem={eliminarItem} editarItem={editarItem}/>
                ))
            }
        </>
    );
}
 
export default DisplayItems;