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

    console.tron.createEnhancer()
    
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }
  
  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    Reactotron.createEnhancer(),
    ...enhancers
  );
  
  const store = createStore(
    createRootReducer(history),
    initialState,
    composedEnhancers
  );
  
  export default store;
  