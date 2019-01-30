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
import { SET_VISITED_PAGE, SORT_MOVIES } from '../types/ui'

import { getStorageItem, setStorageItem } from '../utils/storage'
import { SELECTED_MOVIES, VISITED_PAGES, SORT_VALUE } from '../var/keys'
import { setUI } from '../actions/ui'
import { goToApp } from '../navigation'

function getState(state) {
  return state
}

export function* persistenceHandlerSaga() {
  yield all([
    fork(getInitialData),
    fork(handlePersistedSaga),
  ])
  yield take(ADD_MOVIES)
  yield call(goToApp)
}

function* getInitialData() {
  const selected = yield call(getStorageItem, SELECTED_MOVIES)
  yield put({ type: ADD_MOVIES_TO_SELECTED, payload: { data: selected === null ? [] : JSON.parse(selected) } })
  const pages = yield call(getStorageItem, VISITED_PAGES)
  yield put(setUI({ section: 'visited_pages', value: pages }))
  const sort = yield call(getStorageItem, SORT_VALUE)
  yield put(setUI({ section: 'sort_value', value: sort || '' }))
}

function* handlePersistedSaga() {
  while (true) {
    const action = yield take([
      ADD_MOVIES_TO_SELECTED_REQUEST,
      DELETE_MOVIE_FROM_SELECTED_REQUEST,
      SET_VISITED_PAGE,
      SORT_MOVIES,
    ])
    switch (action.type) {
      case ADD_MOVIES_TO_SELECTED_REQUEST: {
        yield put({ type: ADD_MOVIES_TO_SELECTED, payload: action.payload })
        const { movies = {} } = yield select(getState)
        yield call(proceedToAsyncStorage, SELECTED_MOVIES, movies, 'selectedMovies')
        break
      }
      case DELETE_MOVIE_FROM_SELECTED_REQUEST: {
        yield put({ type: DELETE_MOVIE_FROM_SELECTED, payload: action.payload })
        const { movies = {} } = yield select(getState)
        yield call(proceedToAsyncStorage, SELECTED_MOVIES, movies, 'selectedMovies')
        break
      }
      case SET_VISITED_PAGE: {
        yield put(setUI({
          section: 'visited_pages',
          key: action.payload.key,
          value: action.payload.value,
        }))
        const { UI = {} } = yield select(getState)
        yield call(proceedToAsyncStorage, VISITED_PAGES, UI, 'visited_pages')
        break
      }
      case SORT_MOVIES: {
        yield put(setUI({
          section: 'sort_value',
          value: action.payload.value,
        }))
        const { UI = {} } = yield select(getState)
        yield call(proceedToAsyncStorage, SORT_VALUE, UI, 'sort_value')
        break
      }
      default:
        console.warn('unhandled persisted action', action.type)
        break
    }
  }
}

function* proceedToAsyncStorage(storageKey, reducer, reducerKey) {
  yield call(setStorageItem, storageKey, reducer[reducerKey])
}
