import { PRODUCTS } from './actionTypes'

const generateProducts = (value) => ({
    type: PRODUCTS,
    newValue: value,
})

export default generateProducts