import { GRID_ITEMS_SIZE } from '../actions/actionTypes'

export default function gridItemsSize(state = 0, action) {
  switch(action.type) {
    case GRID_ITEMS_SIZE:
      return state = action.gridValue

    default:
      return state 
  }
}