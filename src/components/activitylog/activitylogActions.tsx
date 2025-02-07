export enum ActionTypes {
  GET_ACTIVITY_LOG_REQUEST = "GET_ACTIVITY_LOG_REQUEST",
  GET_ACTIVITY_LOG_SUCCESS = "GET_ACTIVITY_LOG_SUCCESS",
  GET_ACTIVITY_LOG_FAILURE = "GET_ACTIVITY_LOG_FAILURE",

  USER_ACTIVITY_DETAILS_REQUEST = "USER_ACTIVITY_DETAILS_REQUEST",
  USER_ACTIVITY_DETAILS_SUCCESS = "USER_ACTIVITY_DETAILS_SUCCESS",
  USER_ACTIVITY_DETAILS_FAILURE = "USER_ACTIVITY_DETAILS_FAILURE",
}

export interface Action<T> {
  type: ActionTypes;
  payload: T;
}

export const getActivityLogRequest = (payload: any) => {
  return {
    type: ActionTypes.GET_ACTIVITY_LOG_REQUEST,
    payload,
  };
};

export const userActivityDetailsRequest = (payload: any) => {
  return {
    type: ActionTypes.USER_ACTIVITY_DETAILS_REQUEST,
    payload,
  };
};
