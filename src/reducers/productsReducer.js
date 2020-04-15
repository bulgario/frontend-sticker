import { UPDATE_PRODUCTS } from '../actions/actionTypes'

import produce from 'immer'

export default function filter(state = [], action) {
  switch(action.type) {
    case UPDATE_PRODUCTS:
      const filtrosSelecionados = action.selectedFilters
      const produtos = action.products

      const allProductsFiltered = []
// impar MARCADO
// par DESMARCADO
      const filtros = []

      Object.entries(filtrosSelecionados).forEach(([key, val]) => {
        val.forEach(data => {
         filtros.push( data.label)
        })
      })


      for(let i = 0; i < filtros.length; i++) {
        console.log(filtros[i])
      }   

      produtos.forEach(produto => { //para cada produto...
        let vapo = true
        Object.entries(produto.data).forEach(([key, value]) => { //para cada campo do produto...
          if(filtrosSelecionados[key]) { //se nome do campo for true
            const fieldLabel = filtrosSelecionados[key].map( foo => foo.label) // = nome do campo
            if(fieldLabel.includes(value) === false) { // se alguma parte do filtro nao estiver relacionado a este campo verificado
              vapo = false
            }
          } 
        })

        if(vapo) {
          allProductsFiltered.push(produto) //joga os produtos validos no array
        }
      })

      if(allProductsFiltered.length >= 1) {
        action.products = allProductsFiltered
        return action.products
      } else {
        return action.products
      }

    default:
      return state 
  }
}