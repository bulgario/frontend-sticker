import { createStore, applyMiddleware, compose } from 'redux';
import Reactotron from '../../src/config/ReactotronConfig'
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import createRootReducer from '../reducers';

export const history = createHistory({forceRefresh:true});

const initialState = {};
const enhancers = [];
const middleware = [
  thunk,
  routerMiddleware(history)
];


if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__
    
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }
  
  const composedEnhancers = process.env.NODE_ENV === 'development ' ?
  compose(
    applyMiddleware(...middleware),
    Reactotron && Reactotron.createEnhancer() ? Reactotron.createEnhancer() : null,
    ...enhancers
  ) :
  compose(
    applyMiddleware(...middleware),
    ...enhancers
  )
  
  const store = createStore(
    createRootReducer(history),
    initialState,
    composedEnhancers
  );
  
  export default store;
  