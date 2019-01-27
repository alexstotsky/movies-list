import { fork, all } from 'redux-saga/effects'
import { connectionHandlerSaga } from './api'
import { fetchMoviesSaga } from './movies'

export default function* () {
  yield all([
    fork(connectionHandlerSaga),
    fork(fetchMoviesSaga),
  ])
}
