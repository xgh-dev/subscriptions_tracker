
import { useEffect } from "react";
import SingleItem from "./SingleItem"

const DisplayItems = ({ subs, eliminarItem, editarItem, cargarItems }) => {
    //llamar a la funcion cargar items para que mantenga la lista actualizada y pueda desencadenar una nueva ejecucion del elemento que itera la lista que generara las vistas de las suscripciones
    //cargarItems()

    useEffect(() => {
        // Llamamos a cargarItems solo cuando el componente se monta
        cargarItems();
      }, []);

    return ( 
        <>
            <h2>Subscripciones</h2>
            {
                subs.map(item => (
                    <SingleItem key={item.id} type={item.nombre_subscripcion} price={item.precio} id={item.id} eliminarItem={eliminarItem} editarItem={editarItem}/>
                ))
            }
        </>
    );
}
 
export default DisplayItems;