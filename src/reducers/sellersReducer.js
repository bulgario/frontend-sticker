import { SELLERS_LOADED, SELLERS_LOADING } from '../actions/actionTypes';

const initialState = {
  loading: true,
};

const sellersReducer = (state = initialState, { type, sellers }) => {
  switch (type) {
    case SELLERS_LOADED:
      return {
        loading: false,
        data: sellers,
      };
    case SELLERS_LOADING:
      return {
        loading: true,
      };
    default:
      return state;
  }
};

export default sellersReducer;
