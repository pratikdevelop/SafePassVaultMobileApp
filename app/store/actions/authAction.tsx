import {
  SET_TOKEN,
  CLEAR_TOKEN,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
} from "./actionType";
import SessionStorage from "react-native-session-storage";
import AuthService from "@/app/services/authService";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import authService from "@/app/services/authService";
import { tokens } from "react-native-paper/lib/typescript/styles/themes/v3/tokens";

// Action Creators
export const setToken = (token: any) => ({
  type: SET_TOKEN,
  payload: token,
});

export const clearToken = () => ({
  type: CLEAR_TOKEN,
});

export const loginUser = (
  username: string,
  password: string
): ThunkAction<Promise<any>, any, unknown, Action<string>> => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const response = await AuthService.login({ username, password });
      if (response.mfaRequired) {
        return { mfaRequired: true, mfaMethod: response.mfaMethod };
      } else {
        await SessionStorage.setItem("token", response.token);
        await authService.getProfile(response.token);
        dispatch(setToken(response.token));
        return { success: true };
      }
    } catch (error: any) {
      console.log("Login error:", JSON.stringify(error));
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
      return { success: false, message: error.message };
    }
  };
};

export const logoutUser = () => {
  return async (dispatch: (arg0: { type: string }) => void) => {
    SessionStorage.removeItem("token");
    dispatch(clearToken()); // Use clearToken action
  };
};

// Load token from SessionStorage
export const loadToken = () => {
  return async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    const token = await SessionStorage.getItem("token");
    if (token) {
      dispatch(setToken(token)); // Use setToken action
    }
  };
};

// Additional methods
export const signup = (signupForm: any) => async (dispatch: any) => {
  try {
    await AuthService.signup(signupForm);
    // Optionally handle success
  } catch (error) {
    console.error("Signup failed:", error);
    // Handle error if needed
  }
};

export const emailVerification = (OTPForm: any) => async () => {
  try {
    const response = await AuthService.emailVerification(OTPForm);
    return response; // Optionally handle the response
  } catch (error) {
    console.error("Email verification failed:", error);
    throw error;
  }
};

export const resetPassword = (email: string) => async () => {
  try {
    const response = await AuthService.resetPassword(email);
    return response; // Optionally handle the response
  } catch (error) {
    console.error("Password reset failed:", error);
    throw error;
  }
};

export const verifyResetRequest = (id: string, token: string) => async () => {
  try {
    const response = await AuthService.verifyResetRequest(id, token);
    return response; // Optionally handle the response
  } catch (error) {
    console.error("Reset request verification failed:", error);
    throw error;
  }
};

export const changePassword = (password: any, id: any) => async () => {
  try {
    const response = await AuthService.changePassword(password, id);
    return response; // Optionally handle the response
  } catch (error) {
    console.error("Password change failed:", error);
    throw error;
  }
};

// Other actions as needed...
