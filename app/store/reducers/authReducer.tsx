// authReducer.js
import { SET_TOKEN, CLEAR_TOKEN } from '../actions/actionType';

const initialState = {
  token: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.payload,
        loading: false,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_TOKEN: // Handle SET_TOKEN action
      return {
        ...state,
        token: action.payload,
      };
    case CLEAR_TOKEN: // Handle CLEAR_TOKEN action
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
