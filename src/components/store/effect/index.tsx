import { all, fork } from "redux-saga/effects";
import signInSaga from "../../login/loginSaga";
import usersSaga from "../../users/usersSaga";
import activityLogSaga from "../../activitylog/activitylogSaga";

export function* rootSaga() {
  yield all([fork(signInSaga), fork(usersSaga), fork(activityLogSaga)]);
}
