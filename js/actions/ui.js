import * as TYPES from '../types/ui'

export function setUI(payload) {
  return {
    type: TYPES.SET_UI_VALUE,
    payload,
  }
}

export function setVisitedPage(payload) {
  return {
    type: TYPES.SET_VISITED_PAGE,
    payload,
  }
}

export function setMovieSort(payload) {
  return {
    type: TYPES.SORT_MOVIES,
    payload,
  }
}
