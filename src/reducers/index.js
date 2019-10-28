import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import sellers from './sellersReducer';
import auth from './authReducer';
import date from './dateReducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  sellers,
  auth,
  date,
});
