
export const moneyFormat = monto => {
    return monto.toLocaleString('en-us',{
        style: 'currency',
        currency: 'USD'
    })
}