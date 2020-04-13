import { UPDATE_PRODUCTS } from '../actions/actionTypes'

import produce from 'immer'

export default function filter(state = [], action) {
  switch(action.type) {
    case UPDATE_PRODUCTS:
      const filtrosSelecionados = action.selectedFilters
      const produtos = action.products

      const allProductsFiltered = []

      const data = Object.entries(filtrosSelecionados).map(([ filterName, value ]) => {
        return value.map(item => {
          // desta forma eu retorno pra cada uma das vezes um array do filterName que estou passando assim no caso ficaria:
          // categoria: tem todos essses produtos
          // fornecedor: tem todos esses produtos
          // tudo baseado nos itens que eu selecionei no filtro

          return produtos.filter( product => {
            return product.data[filterName] === item.label && item.checked === true
          })

          // produtos.map(product => {
          //   if(product.data[filterName] === item.label && item.checked === true) {
          //     allProductsFiltered.push(product)
          //   }
          // })
        })
      }) 

      if(data.length >= 1) {
        action.products = data
        return action.products
      } else {
        return action.products
      }

      if(allProductsFiltered.length > 1) {
        return allProductsFiltered
      } else {
        return action.products
      }

    default:
      return state 
  }
}