import {
  take, put, fork, call, select, all,
} from 'redux-saga/effects'

import {
  ADD_MOVIES,
  ADD_MOVIES_TO_SELECTED,
  ADD_MOVIES_TO_SELECTED_REQUEST,
  DELETE_MOVIE_FROM_SELECTED,
  DELETE_MOVIE_FROM_SELECTED_REQUEST,
} from '../types/movies'
import { getStorageItem, setStorageItem } from '../utils/storage'
import { SELECTED_MOVIES, VISITED_PAGES } from '../var/keys'
import { setUI } from '../actions/ui'
import { goToApp } from '../navigation'

function getState(state) {
  return state
}

export function* persistenceHandlerSaga() {
  yield all([
    fork(getInitialData),
    fork(selectedMoviesSaga),
  ])
  yield take(ADD_MOVIES)
  yield call(goToApp)
}

function* getInitialData() {
  const selected = yield call(getStorageItem, SELECTED_MOVIES)
  yield put({ type: ADD_MOVIES_TO_SELECTED, payload: { data: selected === null ? [] : JSON.parse(selected) } })
  const pages = yield call(getStorageItem, VISITED_PAGES)
  yield put(setUI({ section: 'visited_pages', value: pages }))
}

function* selectedMoviesSaga() {
  while (true) {
    const action = yield take([ADD_MOVIES_TO_SELECTED_REQUEST, DELETE_MOVIE_FROM_SELECTED_REQUEST])
    if (action.type === ADD_MOVIES_TO_SELECTED_REQUEST) {
      yield put({ type: ADD_MOVIES_TO_SELECTED, payload: action.payload })
    } else if (action.type === DELETE_MOVIE_FROM_SELECTED_REQUEST) {
      yield put({ type: DELETE_MOVIE_FROM_SELECTED, payload: action.payload })
    }
    yield call(proceedSelectedMovie)
  }
}

function* proceedSelectedMovie() {
  const { movies = {} } = yield select(getState)
  const { selectedMovies } = movies
  yield call(setStorageItem, SELECTED_MOVIES, selectedMovies)
}
