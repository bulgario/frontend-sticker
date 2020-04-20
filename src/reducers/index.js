import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import sellers from './sellersReducer';
import auth from './authReducer';
import date from './dateReducer';
import filter from './filtersOptReducer';
import products from './productsReducer';
import orderItems from './orderItemsReducer'

export default (history) => combineReducers({
  router: connectRouter(history),
  sellers,
  auth,
  date,
  filter,
  products,
  orderItems
});
