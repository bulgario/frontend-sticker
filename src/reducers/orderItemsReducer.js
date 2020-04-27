import { ORDER_ITEMS_ORDER_FILTER } from '../actions/actionTypes'

export default function orderItems(state = [], action) {
	switch(action.type) {
		case ORDER_ITEMS_ORDER_FILTER:
      const products = action.products
      let orderFields = action.orderFields
      let fieldsForOrder = []
      let orderCategories = {}

      products.map(product => { //eslint-disable-line
        return Object.keys(product.data).map(keys => { //eslint-disable-line
          return orderFields.map(valor => { //eslint-disable-line
            if(keys === valor) { //eslint-disable-line
              fieldsForOrder.push(keys) //eslint-disable-line
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
        return products.map(produtos => { //eslint-disable-line
          Object.entries(produtos.data).forEach(([key, value]) => { //eslint-disable-line
            if(field === key) { //eslint-disable-line
              orderFieldsObj[key].push(produtos.data[field]) //eslint-disable-line
            }
          })
        })
      })

      return orderFieldsObj

			default:
			return state
	}
}