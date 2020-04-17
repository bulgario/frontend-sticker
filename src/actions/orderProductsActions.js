import { ORDER_PRODUCTS } from './actionTypes'

const generateFilterItens = (value) => ({
    type: ORDER_PRODUCTS,
    newValue: value,
})

export default generateFilterItens