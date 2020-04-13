import authActions from './authActions';
import selectedDate from './selectedDateActions'
import filterOptions from './filterOptionsActions'
import productsActions from './productsActions'

export const signIn = authActions.signIn;
export const date = selectedDate.date;
export const generateFilterItens = filterOptions.generateFilterItens
export const generateProducts = productsActions.generateProducts