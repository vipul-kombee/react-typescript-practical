import { combineReducers, Action } from "redux";
import signInReducer from "../../login/loginReducer";
import usersReducer from "../../users/usersReducer";
import activitylogReducer from "../../activitylog/activitylogReducer";

export const appReducer = combineReducers({
  signin: signInReducer,
  usersData: usersReducer,
  activitylog: activitylogReducer,
});

export const rootReducer = (
  state: RootState | undefined,
  action: Action
): RootState => {
  if (action.type === "RESET") {
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof appReducer>;
