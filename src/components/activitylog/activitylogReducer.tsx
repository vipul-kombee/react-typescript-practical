import { Reducer } from "redux";
import { ActionTypes } from "./activitylogActions";

export interface ActivityLogReducerType {
  isActivityLogReq: boolean;
  activityLogs: any;
  isUserActivityDetails: boolean;
  userActivityDetails: any;
}

const defaultState: ActivityLogReducerType = {
  isActivityLogReq: false,
  activityLogs: undefined,
  isUserActivityDetails: false,
  userActivityDetails: undefined,
};

const activitylogReducer: Reducer<ActivityLogReducerType> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case ActionTypes.GET_ACTIVITY_LOG_REQUEST:
      return {
        ...state,
        activityLogs: undefined,
        isActivityLogReq: true,
      };
    case ActionTypes.GET_ACTIVITY_LOG_SUCCESS:
      return {
        ...state,
        activityLogs: action.data,
        isActivityLogReq: false,
      };
    case ActionTypes.GET_ACTIVITY_LOG_FAILURE:
      return {
        ...state,
        isActivityLogReq: false,
        activityLogs: undefined,
        error: action.error,
      };
    case ActionTypes.USER_ACTIVITY_DETAILS_REQUEST:
      return {
        ...state,
        userActivityDetails: undefined,
        isUserActivityDetails: true,
      };
    case ActionTypes.USER_ACTIVITY_DETAILS_SUCCESS:
      return {
        ...state,
        userActivityDetails: action.data,
        isUserActivityDetails: false,
      };
    case ActionTypes.USER_ACTIVITY_DETAILS_FAILURE:
      return {
        ...state,
        isUserActivityDetails: false,
        userActivityDetails: undefined,
        error: action.error,
      };
    default:
      return state;
  }
};

export default activitylogReducer;
