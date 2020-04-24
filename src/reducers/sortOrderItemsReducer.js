import { ORDER_ITEMS } from '../actions/actionTypes'

export default function orderedItems(state = [], action) {
  switch(action.type) {
    case ORDER_ITEMS:
      console.log("entro aqui")
      const prodcts = action.products
      const fieldName = action.fieldName
      const orderedItems = prodcts.sort((a, b) => (a.data[fieldName] > b.data[fieldName]) ? 1 : -1)

    return orderedItems

    default:
      return state 
  }
}