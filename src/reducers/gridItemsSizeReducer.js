import { GRID_ITEMS_SIZE } from '../actions/actionTypes'

import produce from 'immer'

export default function gridItemsSize(state = 0, action) {
  switch(action.type) {
    case GRID_ITEMS_SIZE:
      return state = action.gridValue

    default:
      return state 
  }
}