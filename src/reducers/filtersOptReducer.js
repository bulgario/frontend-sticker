import { UPDATE_FILTER } from '../actions/actionTypes'

export default function filter(state = [], action) {
  switch(action.type) {
    case UPDATE_FILTER:
      Object.entries(action.filterOpt).forEach(([field, values]) => {
        action.filterOpt[field] = [...new Set(values)]
        const newFilter = action.filterOpt[field].map(value => {
          return { label: value, checked: false }
        })
        action.filterOpt[field] = newFilter
      })

      return action.filterOpt

    default:
      return state 
  }
}