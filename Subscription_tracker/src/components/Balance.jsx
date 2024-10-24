import { moneyFormat } from "../helpers"

const Balance = ({count}) => {
    return (
        <div className="balance">
            <h3>Presupuesto: {moneyFormat(count)}</h3>
            <h3>Dispobible: {moneyFormat(count)}</h3>
            <h3>Gastado: {moneyFormat(count)}</h3>
        </div>
    )
}

export default Balance