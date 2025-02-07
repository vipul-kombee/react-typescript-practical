import { put, takeLatest, fork, call } from "redux-saga/effects";
import { postRequestAPI, getRequestAPI } from "../../global/api";
import { tokenkey } from "../../utils/auth";
import { ActionTypes } from "./loginActions";

function* loginUserSaga(action: any): any {
  try {
    const response = yield call(postRequestAPI, {
      url: "login",
      data: action.payload,
    });
    if (response?.data?.data) {
      localStorage.setItem(tokenkey, response?.data?.data?.authorization);
      yield put({
        type: ActionTypes.LOGIN_SUCCESS,
        data: response?.data?.data,
      });
    } else {
      yield put({
        status: "success",
        type: ActionTypes.LOGIN_FAILURE,
        error: response?.data,
      });
    }
  } catch (err: any) {
    yield put({
      type: ActionTypes.LOGIN_FAILURE,
      error: {
        status: "failed",
        message: err?.response?.data?.message ?? "Something went wrong!",
      },
    });
  }
}

function* logoutUserSaga(): any {
  try {
    const response = yield call(getRequestAPI, { url: "logout" });
    yield put({ type: ActionTypes.LOGOUT_SUCCESS, data: response.data });
  } catch (err: any) {
    yield put({
      type: ActionTypes.LOGOUT_FAILURE,
      error: {
        status: "failed",
        message: err?.response?.data?.message ?? "Something went wrong!",
      },
    });
  }
}

function* watchLoginRequest() {
  yield takeLatest(ActionTypes.LOGIN_REQUEST, loginUserSaga);
  yield takeLatest(ActionTypes.LOGOUT_REQUEST, logoutUserSaga);
}

function* signInSaga() {
  yield fork(watchLoginRequest);
}

export default signInSaga;
