import { CREATE_FILTERS } from './actionTypes'

const generateFilterItens = (value) => ({
    type: CREATE_FILTERS,
    newValue: value,
})

export default generateFilterItens