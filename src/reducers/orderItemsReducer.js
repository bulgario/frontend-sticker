import { ORDER_ITEMS_ORDER_FILTER } from '../actions/actionTypes'

export default function orderItems(state = [], action) {
	switch(action.type) {
		case ORDER_ITEMS_ORDER_FILTER:
      const products = action.products
      let orderFields = action.orderFields
      let fieldsForOrder = []
      let orderCategories = {}

      products.map(product => { //eslint-disable-line
        return Object.keys(product.data).map(keys => {
          return orderFields.map(valor => {
            if(keys === valor) {
              fieldsForOrder.push(keys)
            }
          }) 
        })
      })

      fieldsForOrder = [...new Set(fieldsForOrder)]

      for(let i = 0; i < fieldsForOrder.length; i++) {
        orderCategories[fieldsForOrder[i]] = []     
      }

      let orderFieldsObj = {}
      orderFields.forEach(value => {
        orderFieldsObj[value] = []
      })
    

      fieldsForOrder.map(field => { //eslint-disable-line
        return products.map(produtos => {
          Object.entries(produtos.data).forEach(([key, value]) => {
            if(field === key) {
              orderFieldsObj[key].push(produtos.data[field])
            }
          })
        })
      })

      return orderFieldsObj

			default:
			return state
	}
}