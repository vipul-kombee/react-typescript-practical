import { put, takeLatest, fork, call } from "redux-saga/effects";
import { ActionTypes } from "./usersActions";
import { getRequestAPI, postRequestAPI } from "../../global/api";

function* getUsersDataSaga(action: any): any {
  try {
    const { page, perPage, search, filter, sort, orderBy } = action?.payload;
    let url = `users?page=${page}&per_page=${perPage}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    if (sort) {
      url += `&sort=${encodeURIComponent(sort)}`;
    }

    if (orderBy) {
      url += `&order_by=${encodeURIComponent(orderBy)}`;
    }

    if (filter) {
      url += `&filter=${encodeURIComponent(filter)}`;
    }

    const response = yield call(getRequestAPI, { url });

    if (response?.data?.data) {
      yield put({
        type: ActionTypes.USER_GET_SUCCESS,
        data: response?.data,
      });
    } else {
      yield put({ type: ActionTypes.USER_GET_FAILURE, error: response?.data });
    }
  } catch (err: any) {
    yield put({
      type: ActionTypes.USER_GET_FAILURE,
      error: {
        status: "failed",
        message: err?.response?.data?.message ?? "Something went wrong!",
      },
    });
  }
}

function* addUserSaga(action: any): any {
  try {
    const response = yield call(postRequestAPI, {
      url: "users",
      data: action.payload,
    });

    if (response?.data?.data) {
      yield put({
        type: ActionTypes.USER_ADD_SUCCESS,
        data: response?.data?.data,
      });
    } else {
      yield put({ type: ActionTypes.USER_ADD_FAILURE, error: response?.data });
    }
  } catch (err: any) {
    yield put({
      type: ActionTypes.USER_ADD_FAILURE,
      error: {
        status: "failed",
        message: err?.response?.data?.message ?? "Something went wrong!",
      },
    });
  }
}

function* editUserSaga(action: any): any {
  try {
    const formData = action.payload;
    const id = formData.get("id");
    const response = yield call(postRequestAPI, {
      url: `users/${id}`,
      data: action?.payload,
    });

    if (response?.data?.data) {
      yield put({
        type: ActionTypes.USER_EDIT_SUCCESS,
        data: response?.data?.data,
      });
    } else {
      yield put({ type: ActionTypes.USER_EDIT_FAILURE, error: response?.data });
    }
  } catch (err: any) {
    yield put({
      type: ActionTypes.USER_EDIT_FAILURE,
      error: {
        status: "failed",
        message: err?.response?.data?.message ?? "Something went wrong!",
      },
    });
  }
}

function* deleteUserSaga(action: any): any {
  try {
    const response = yield call(postRequestAPI, {
      url: "users-delete-multiple",
      data: action.payload,
    });

    if (response?.data?.data) {
      yield put({
        type: ActionTypes.USER_DELETE_SUCCESS,
        data: response?.data?.data,
      });
    } else {
      yield put({
        type: ActionTypes.USER_DELETE_FAILURE,
        error: response?.data,
      });
    }
  } catch (err: any) {
    yield put({
      type: ActionTypes.USER_DELETE_FAILURE,
      error: {
        status: "failed",
        message: err?.response?.data?.message ?? "Something went wrong!",
      },
    });
  }
}

function* getUserRoleSaga(): any {
  try {
    const response = yield call(getRequestAPI, {
      url: "roles",
    });

    if (response?.data?.data) {
      yield put({
        type: ActionTypes.GET_USER_ROLE_SUCCESS,
        data: response?.data?.data,
      });
    } else {
      yield put({
        type: ActionTypes.GET_USER_ROLE_FAILURE,
        error: response?.data,
      });
    }
  } catch (err: any) {
    yield put({
      type: ActionTypes.GET_USER_ROLE_FAILURE,
      error: {
        status: "failed",
        message: err?.response?.data?.message ?? "Something went wrong!",
      },
    });
  }
}

function* getUserDetailsSaga(action: any): any {
  try {
    const response = yield call(getRequestAPI, {
      url: `users/${action.payload}`,
    });

    if (response?.data?.data) {
      yield put({
        type: ActionTypes.GET_USER_DETAILS_SUCCESS,
        data: response?.data?.data,
      });
    } else {
      yield put({
        type: ActionTypes.GET_USER_DETAILS_FAILURE,
        error: response?.data,
      });
    }
  } catch (err: any) {
    yield put({
      type: ActionTypes.GET_USER_DETAILS_FAILURE,
      error: {
        status: "failed",
        message: err?.response?.data?.message ?? "Something went wrong!",
      },
    });
  }
}

function* watchUsersRequest() {
  yield takeLatest(ActionTypes.USER_GET_REQUEST, getUsersDataSaga);
  yield takeLatest(ActionTypes.USER_ADD_REQUEST, addUserSaga);
  yield takeLatest(ActionTypes.USER_EDIT_REQUEST, editUserSaga);
  yield takeLatest(ActionTypes.USER_DELETE_REQUEST, deleteUserSaga);
  yield takeLatest(ActionTypes.GET_USER_ROLE_REQUEST, getUserRoleSaga);
  yield takeLatest(ActionTypes.GET_USER_DETAILS_REQUEST, getUserDetailsSaga);
}

function* usersSaga() {
  yield fork(watchUsersRequest);
}

export default usersSaga;
