import { take, put, fork } from 'redux-saga/effects'

import { SEND_MOVIES_REQUEST, ADD_MOVIES, GET_MOVIES_FROM_JSON } from '../types/movies'
import { API_REQUEST } from '../types/api'
import config from '../config'

import movies from '../var/films.json'

export function* fetchMoviesSaga() {
  yield fork(takeMoviesFromJSONSaga)
  while (true) {
    yield take(SEND_MOVIES_REQUEST)
    yield put({
      type: API_REQUEST,
      payload: {
        path: config.myAPIFilmsPath,
        method: 'GET',
        onSuccess: ADD_MOVIES,
        onFail: GET_MOVIES_FROM_JSON,
      },
    })
  }
}

function* takeMoviesFromJSONSaga() {
  while (true) {
    const action = yield take(GET_MOVIES_FROM_JSON)
    console.log('[fetchMovies onFail response]', action.payload)
    yield put({ type: ADD_MOVIES, payload: { data: movies } })
  }
}
