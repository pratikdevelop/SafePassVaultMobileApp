import { SET_TOKEN, CLEAR_TOKEN } from './actionType';
import SessionStorage from 'react-native-session-storage';

export const setToken = (token: any) => ({
  type: SET_TOKEN,
  payload: token,
});

export const clearToken = () => ({
  type: CLEAR_TOKEN,
});

// Modify your loginUser function to use setToken

import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { LOGIN_REQUEST, LOGIN_FAILURE } from './actionType';
import axiosConfig from '@/axios-config';
export const loginUser = (username: any, password: string): ThunkAction<Promise<any>, any, unknown, Action<string>> => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const response = await axiosConfig.post('/auth/login', { username, password });
      const data = response.data;

      if (response.status === 200) {
        if (data.mfaRequired) {
          return { mfaRequired: true, mfaMethod: data.mfaMethod };
        } else {
          SessionStorage.setItem('token', data.token);
          dispatch(setToken(data.token));
          return { success: true };
        }
      } else {
        dispatch({ type: LOGIN_FAILURE, payload: data.message });
        return { success: false, message: data.message };
      }
    } catch (error: any) {
      console.log('ddd', error.message);
      
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
      return { success: false, message: error.message };
    }
  };
};


export const logoutUser = () => {
  return async (dispatch: (arg0: { type: string; }) => void) => {
    SessionStorage.removeItem('token');
    dispatch(clearToken()); // Use clearToken action
  };
};

// Load token from AsyncStorage
export const loadToken = () => {
  return  (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    const token = SessionStorage.getItem('token') || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzEyM2JmNjJkMjZmZjMzNjM0NWYxN2UiLCJpYXQiOjE3Mjk1ODgwODl9.oZgPmU2hcGLNcrLoCUgKEgfzltijlnEP8Ep3KhTkpDc"
;
    if (token) {
      dispatch(setToken(token)); // Use setToken action
    }
  };
};
