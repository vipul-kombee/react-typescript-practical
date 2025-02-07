import { Reducer } from "redux";
import { ActionTypes } from "./usersActions";

export interface UsersReducerType {
  isUsersReq: boolean;
  usersData: any;
  isUserAdd: boolean;
  resAddUser: any;
  isUserEdit: boolean;
  resEditUser: any;
  isUserDelete: boolean;
  resDeleteUser: any;
  isUserRole: boolean;
  userRole: any;
  isUserDetails: boolean;
  userDetails: any;
}

const defaultState: UsersReducerType = {
  isUsersReq: false,
  usersData: undefined,
  isUserAdd: false,
  resAddUser: undefined,
  isUserEdit: false,
  resEditUser: undefined,
  isUserDelete: false,
  resDeleteUser: undefined,
  isUserRole: false,
  userRole: undefined,
  isUserDetails: false,
  userDetails: undefined,
};

const usersReducer: Reducer<UsersReducerType> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case ActionTypes.USER_GET_REQUEST:
      return {
        ...state,
        usersData: undefined,
        isUsersReq: true,
      };
    case ActionTypes.USER_GET_SUCCESS:
      return {
        ...state,
        usersData: action.data,
        isUsersReq: false,
      };
    case ActionTypes.USER_GET_FAILURE:
      return {
        ...state,
        isUsersReq: false,
        usersData: undefined,
        error: action.error,
      };
    case ActionTypes.USER_ADD_REQUEST:
      return {
        ...state,
        resAddUser: undefined,
        isUserAdd: true,
      };
    case ActionTypes.USER_ADD_SUCCESS:
      return {
        ...state,
        resAddUser: action.data,
        isUserAdd: false,
      };
    case ActionTypes.USER_ADD_FAILURE:
      return {
        ...state,
        isUserAdd: false,
        resAddUser: undefined,
        error: action.error,
      };
    case ActionTypes.USER_EDIT_REQUEST:
      return {
        ...state,
        resEditUser: undefined,
        isUserEdit: true,
      };
    case ActionTypes.USER_EDIT_SUCCESS:
      return {
        ...state,
        resEditUser: action.data,
        isUserEdit: false,
      };
    case ActionTypes.USER_EDIT_FAILURE:
      return {
        ...state,
        isUserEdit: false,
        resEditUser: undefined,
        errors: action.error,
      };
    case ActionTypes.USER_DELETE_REQUEST:
      return {
        ...state,
        resDeleteUser: undefined,
        isUserDelete: true,
      };
    case ActionTypes.USER_DELETE_SUCCESS:
      return {
        ...state,
        resDeleteUser: action.data,
        isUserDelete: false,
      };
    case ActionTypes.USER_DELETE_FAILURE:
      return {
        ...state,
        isUserDelete: false,
        resDeleteUser: undefined,
        deleteerror: action.error,
      };
    case ActionTypes.GET_USER_ROLE_REQUEST:
      return {
        ...state,
        userRole: undefined,
        isUserRole: true,
      };
    case ActionTypes.GET_USER_ROLE_SUCCESS:
      return {
        ...state,
        userRole: action.data,
        isUserRole: false,
      };
    case ActionTypes.GET_USER_ROLE_FAILURE:
      return {
        ...state,
        isUserRole: false,
        userRole: undefined,
        error: action.error,
      };
    case ActionTypes.GET_USER_DETAILS_REQUEST:
      return {
        ...state,
        userDetails: undefined,
        isUserDetails: true,
      };
    case ActionTypes.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: action.data,
        isUserDetails: false,
      };
    case ActionTypes.GET_USER_DETAILS_FAILURE:
      return {
        ...state,
        isUserDetails: false,
        userDetails: undefined,
        error: action.error,
      };
    default:
      return state;
  }
};

export default usersReducer;
