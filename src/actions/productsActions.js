import { PRODUCTS } from './actionTypes'

const orderProducts = (value) => ({
    type: PRODUCTS,
    newValue: value,
})

export default orderProducts