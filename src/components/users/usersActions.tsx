export enum ActionTypes {
  USER_GET_REQUEST = "USER_GET_REQUEST",
  USER_GET_SUCCESS = "USER_GET_SUCCESS",
  USER_GET_FAILURE = "USER_GET_FAILURE",

  USER_ADD_REQUEST = "USER_ADD_REQUEST",
  USER_ADD_SUCCESS = "USER_ADD_SUCCESS",
  USER_ADD_FAILURE = "USER_ADD_FAILURE",

  USER_EDIT_REQUEST = "USER_EDIT_REQUEST",
  USER_EDIT_SUCCESS = "USER_EDIT_SUCCESS",
  USER_EDIT_FAILURE = "USER_EDIT_FAILURE",

  USER_DELETE_REQUEST = "USER_DELETE_REQUEST",
  USER_DELETE_SUCCESS = "USER_DELETE_SUCCESS",
  USER_DELETE_FAILURE = "USER_DELETE_FAILURE",

  GET_USER_ROLE_REQUEST = "GET_USER_ROLE_REQUEST",
  GET_USER_ROLE_SUCCESS = "GET_USER_ROLE_SUCCESS",
  GET_USER_ROLE_FAILURE = "GET_USER_ROLE_FAILURE",

  GET_USER_DETAILS_REQUEST = "GET_USER_DETAILS_REQUEST",
  GET_USER_DETAILS_SUCCESS = "GET_USER_DETAILS_SUCCESS",
  GET_USER_DETAILS_FAILURE = "GET_USER_DETAILS_FAILURE",
}

export interface Action<T> {
  type: ActionTypes;
  payload: T;
}

export const getUsersRequest = (payload: any) => {
  return {
    type: ActionTypes.USER_GET_REQUEST,
    payload,
  };
};

export const addUsersRequest = (payload: any) => {
  return {
    type: ActionTypes.USER_ADD_REQUEST,
    payload,
  };
};

export const editUsersRequest = (payload: any) => {
  return {
    type: ActionTypes.USER_EDIT_REQUEST,
    payload,
  };
};

export const deleteUsersRequest = (payload: any) => {
  return {
    type: ActionTypes.USER_DELETE_REQUEST,
    payload,
  };
};

export const getUserRoleRequest = () => {
  return {
    type: ActionTypes.GET_USER_ROLE_REQUEST,
  };
};

export const getUserDetailsRequest = (payload: any) => {
  return {
    type: ActionTypes.GET_USER_DETAILS_REQUEST,
    payload,
  };
};
