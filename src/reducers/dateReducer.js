import { DATE_SELECTED } from '../actions/actionTypes'

const initialState = {
	selectedDate: ''
}

export default (state = initialState, action) => {
	switch(action.type) {
		case DATE_SELECTED:
			return {
			...state,
			selectedDate: action.selectedDate
			}
			default:
			return state
	}
}