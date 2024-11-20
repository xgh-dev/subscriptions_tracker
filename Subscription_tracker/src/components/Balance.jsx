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
        const spent = subs.reduce((total,item) => Number(item.price) + total, 0);
        setSpent(spent)
        const Balancetotal = count -spent
        cambiosEnSaldo(globalUser,Balancetotal)
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