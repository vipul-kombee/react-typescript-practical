import { put, takeLatest, fork, call } from "redux-saga/effects";
import { ActionTypes } from "./activitylogActions";
import { getRequestAPI } from "../../global/api";

function* getActivitySaga(action: any): any {
  try {
    const { page, perPage, search } = action?.payload;
    let url = `get-activities?page=${page}&per_page=${perPage}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    const response = yield call(getRequestAPI, { url });

    if (response?.data?.data) {
      yield put({
        type: ActionTypes.GET_ACTIVITY_LOG_SUCCESS,
        data: response?.data,
      });
    } else {
      yield put({
        type: ActionTypes.GET_ACTIVITY_LOG_FAILURE,
        error: response?.data,
      });
    }
  } catch (err: any) {
    yield put({
      type: ActionTypes.GET_ACTIVITY_LOG_FAILURE,
      error: {
        status: "failed",
        message: err?.response?.data?.message ?? "Something went wrong!",
      },
    });
  }
}

function* getUserActivityDetailsSaga(action: any): any {
  try {
    const response = yield call(getRequestAPI, {
      url: `get-activities/${action.payload}`,
    });

    if (response?.data?.data) {
      yield put({
        type: ActionTypes.USER_ACTIVITY_DETAILS_SUCCESS,
        data: response?.data?.data,
      });
    } else {
      yield put({
        type: ActionTypes.USER_ACTIVITY_DETAILS_FAILURE,
        error: response?.data,
      });
    }
  } catch (err: any) {
    yield put({
      type: ActionTypes.USER_ACTIVITY_DETAILS_FAILURE,
      error: {
        status: "failed",
        message: err?.response?.data?.message ?? "Something went wrong!",
      },
    });
  }
}

function* watchActicityLogRequest() {
  yield takeLatest(ActionTypes.GET_ACTIVITY_LOG_REQUEST, getActivitySaga);
  yield takeLatest(
    ActionTypes.USER_ACTIVITY_DETAILS_REQUEST,
    getUserActivityDetailsSaga
  );
}

function* activityLogSaga() {
  yield fork(watchActicityLogRequest);
}

export default activityLogSaga;
