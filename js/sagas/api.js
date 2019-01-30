import {
  take, put, call, actionChannel, all, fork, cancel,
} from 'redux-saga/effects'
import { buffers } from 'redux-saga'
import { API_REQUEST, API_REQUEST_FAIL, API_REQUEST_SUCCESS } from '../types/api'
import apiCall from '../utils/api'
import { DISCONNECTED, IS_CONNECTED } from '../types/network'

export function* connectionHandlerSaga() {
  yield all([
    fork(apiHandleSuccess),
    fork(apiHandleFail),
  ])
  while (true) {
    yield take(IS_CONNECTED)
    const requestChan = yield actionChannel([API_REQUEST], buffers.expanding(5))
    const apiHandlerActivity = yield fork(apiHandlerSaga, requestChan)
    yield take(DISCONNECTED)
    yield cancel(apiHandlerActivity)
    requestChan.close()
  }
}

function* apiHandlerSaga(requestChan) {
  while (true) {
    const action = yield take(requestChan)
    const { payload: actionPayload = {} } = action
    const {
      path, method, headers, timeout, payload, onSuccess, onFail,
    } = actionPayload
    const response = yield call(
      apiCall,
      {
        path, method, headers, payload, timeout,
      },
    )
    if (
      response.status && /^20\d/.test(response.status.toString())
      && !response.payload.error && response.payload !== '') {
      yield put({ type: API_REQUEST_SUCCESS, payload: response.payload, onSuccess })
    } else {
      yield put({ type: API_REQUEST_FAIL, payload: response.payload, onFail })
    }
  }
}

// function to handle fail responses it may be useful to handle different status codes
function* apiHandleFail() {
  while (true) {
    const fail = yield take(API_REQUEST_FAIL)
    if (fail.onFail) {
      yield put({ type: fail.onFail, payload: fail.payload })
    } else {
      console.warn(fail.payload)
    }
  }
}

function* apiHandleSuccess() {
  while (true) {
    const success = yield take(API_REQUEST_SUCCESS)
    if (success.onSuccess) {
      yield put({ type: success.onSuccess, payload: success.payload })
    }
  }
}
