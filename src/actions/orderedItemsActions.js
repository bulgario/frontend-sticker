import { ORDER_ITEMS } from './actionTypes'

const orderedItems = (value) => ({
    type: ORDER_ITEMS,
    newValue: value,
})

export default orderedItems