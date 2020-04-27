import { GRID_ITEMS_SIZE } from './actionTypes'

const gridItemsSize = (value) => ({
    type: GRID_ITEMS_SIZE,
    newValue: value,
})

export default gridItemsSize