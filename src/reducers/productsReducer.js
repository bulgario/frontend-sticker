import { UPDATE_PRODUCTS } from '../actions/actionTypes'

export default function filter(state = [], action) {
  switch(action.type) {
    case UPDATE_PRODUCTS:
      const filtrosSelecionados = action.selectedFilters
      const produtos = action.products
      const allProductsFiltered = []

        let trueFiltro = {}
        Object.keys(filtrosSelecionados).forEach(key => {
          const foo = filtrosSelecionados[key].map(filtro => filtro.label)
          let arr = []
          // impar MARCADO
          // par DESMARCADO
          foo.forEach(filtro => {
            let counter = 0
            for(let i = 0; i < foo.length; i++) {
              if(filtro === foo[i]) {
                counter++
              }
            }
            if(counter % 2 === 1) {
              arr.push(filtro)
            }
          })
          arr = [...new Set(arr)]
  
          if(arr.length > 0) {
            trueFiltro[key] = arr
          }
        })

      produtos.forEach(produto => { //para cada produto...
        let validProduct = true
        Object.entries(produto.data).forEach(([key, value]) => { //para cada campo do produto...
          if(trueFiltro[key]) { //se nome do campo for true
            if(trueFiltro[key].includes(value) === false) { // se alguma parte do filtro nao estiver relacionado a este campo verificado
              validProduct = false
            }
          } 
        })

        if(validProduct) {
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