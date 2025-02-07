export enum ActionTypes {
    LOGIN_REQUEST = 'LOGIN_REQUEST',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILURE = 'LOGIN_FAILURE',
  
    LOGOUT_REQUEST = 'LOGOUT_REQUEST',
    LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
    LOGOUT_FAILURE = 'LOGOUT_FAILURE',
  }
  
  export interface Action<T> {
    type: ActionTypes;
    payload: T;
  }
  
  export interface LoginData {
    email: string;
    password: string;
  }
  
  export const loginRequest = (payload: LoginData) => {
    return {
      type: ActionTypes.LOGIN_REQUEST,
      payload,
    };
  };
  
  export const logoutRequest = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    };
  };