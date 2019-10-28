import { DATE_SELECTED } from './actionTypes'

const date = (selectedDate) => ({
    type: DATE_SELECTED,
    newValue: selectedDate,
    ...selectedDate,
})

export default date