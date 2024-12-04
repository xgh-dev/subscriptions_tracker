import { useEffect } from "react";
import { moneyFormat } from "../helpers"

const Balance = ({count, subs, spent, setSpent,globalUser,actualizarSaldo}) => {
    
    const cambiosEnSaldo = async (usuario,saldo) => {
        try {
            await actualizarSaldo(usuario,saldo)            
        } catch (error) {
            console.error(error)
        }
    }

    const updateBalance = () => {
        /*
        el metodo reduce es una función que permite reducir todos los elementos de un array a un solo valor, aplicando una función a cada uno de los elementos, de izquierda a derecha. El valor que resulta de esta operacion es el que retorna el metodo reduce
        */

        /*
        total: (argumento) es el valor acumulado que se va actualizando con cada iteracion. Este valor se devuelve al final del bucle.
        item: es el elemento actual que se está procesando en cada iteración del array. En este caso item representa un elemento dentro de cada iteracion y este es un objeto para extraer su valor usamos item.precio 

        +total: es la funcion de comportamiento para cada iteraión en este caso se sumara el valor actual más el valor guardado previamente en total.

        0: es el valor incial del acumulador total
        
        */ 
        const spent = subs.reduce((total,item) => Number(item.precio) + total, 0);
        setSpent(spent)
        const balanceTotal = count - spent
        //console.log(balanceTotal)
        //cambiosEnSaldo(globalUser,balanceTotal)
    }

    

    useEffect(() => {
        updateBalance();
    },[subs])

    return (
        <div className="balance">
            <h3>Presupuesto: {moneyFormat(count)}</h3>
            <h3>Dispobible: {moneyFormat(count-spent)}</h3>
            <h3>Gastado: {moneyFormat(spent)}</h3>
        </div>
    )
}

export default Balance