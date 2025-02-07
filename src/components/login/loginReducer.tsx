import { Reducer } from 'redux';
import { ActionTypes } from './loginActions';

export interface LoginReducerType {
  isLogin: boolean;
  data: any;
  isLogout: boolean;
  logoutData: any;
}

const defaultState: LoginReducerType = {
  isLogin: false,
  data: undefined,
  isLogout: false,
  logoutData: undefined,
};

const signInReducer: Reducer<LoginReducerType> = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        data: undefined,
        isLogin: true,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLogin: false,
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLogin: false,
        data: undefined,
        error: action.error,
      };
    case ActionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        isLogout: true,
      };
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLogout: false,
        logoutData: action.data,
      };
    case ActionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        isLogout: false,
        logoutData: undefined,
      };
    default:
      return state;
  }
}

export default signInReducer;