const Balance = ({count}) => {
    return (
        <div className="balance">
            <h3>Presupuesto: {count}</h3>
            <h3>Dispobible: {count}</h3>
            <h3>Gastado: {count}</h3>
        </div>
    )
}

export default Balance