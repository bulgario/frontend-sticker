import {
    AUTH_ERROR,
    AUTH_LOADING,
    AUTH_RECOVERY_SUCCESS,
    AUTH_CLEAR,
    AUTH_LOADED
  } from '../actions/actionTypes';
  
  let initialState = {};
  const serializedUser = localStorage.getItem('user');
  
  if (serializedUser !== null) {
    initialState = JSON.parse(serializedUser);
  }
  
  export default (state = initialState, { type, message, authToken, brands, areas, username }) => {
    switch (type) {
      case AUTH_LOADING:
        return {
          loading: true,
        };
      case AUTH_ERROR:
        return {
          error: message,
        };
      case AUTH_RECOVERY_SUCCESS:
        return {
          recovery: true
        };
      case AUTH_LOADED:
        const user = {
          authToken,
          username,
          brands,
          areas,
        };
  
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      case AUTH_CLEAR:
        localStorage.removeItem('user');
        return {};
      default:
        return state;
    }
  };
  