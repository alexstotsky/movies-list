import { fork, all } from 'redux-saga/effects'
import { connectionHandlerSaga } from './api'
import { fetchMoviesSaga } from './movies'
import { persistenceHandlerSaga } from './persistence'

export default function* () {
  yield all([
    fork(connectionHandlerSaga),
    fork(fetchMoviesSaga),
    fork(persistenceHandlerSaga),
  ])
}
