import {
    AUTH_LOADING,
    AUTH_LOADED,
    AUTH_RECOVERY_SUCCESS,
    AUTH_ERROR,
    AUTH_CLEAR
  } from './actionTypes';
  import { OMNI_URL } from '../consts';
  import { get, post } from './utils';
  
  const loading = () => ({
    type: AUTH_LOADING,
  });
  
  const load = (loginResponse) => ({
    type: AUTH_LOADED,
    ...loginResponse,
  });
  
  const recovery = () => ({
    type: AUTH_RECOVERY_SUCCESS,
  });
  
  const error = (message) => ({
    type: AUTH_ERROR,
    message,
  });
  
  const clear = () => ({
    type: AUTH_CLEAR,
  });
  
  export const forgotPassword = (username) =>
    dispatch => {
      dispatch(loading());
  
      return get(`${OMNI_URL}/auth/recovery`,{ username })
        .then(({ success }) => {
          if (success) {
            dispatch(recovery());
          } else {
            dispatch(error('Usuário não encontrado!'))
          }
        })
        .catch(() => {
          dispatch(error('Usuário não encontrado!'))
        });
    };
  
  export const signIn = (username, password) =>
    dispatch => {
      dispatch(loading());
  
      return post(`${OMNI_URL}/auth`, { username, password })
        .then((loginResponse) => {
          if (loginResponse.authToken) {
            dispatch(load(loginResponse));
          } else {
            dispatch(error('Usuário ou senha incorretos!'));
          }
        })
        .catch(() => {
          dispatch(error('Usuário ou senha incorretos!'));
        });
    };
  
  export const signOut = () =>
    dispatch => {
      dispatch(clear());
    };
  
  export default {
    forgotPassword,
    signIn,
    signOut,
  };
  