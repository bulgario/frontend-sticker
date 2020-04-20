import { ORDER_ITEMS_ORDER_FILTER } from './actionTypes'

const orderItems = (value) => ({
    type: ORDER_ITEMS_ORDER_FILTER,
    newValue: value,
})

export default orderItems