import SingleItem from "./SingleItem"

const DisplayItems = ({ subs }) => {
    return ( 
        <>
            <h2>Subscripciones</h2>
            {
                subs.map(item => (
                    <SingleItem key={item.id} type={item.type} price={item.price} id={item.id}/>
                ))
            }
        </>
    );
}
 
export default DisplayItems;