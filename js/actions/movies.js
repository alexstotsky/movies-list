import * as TYPES from '../types/movies'

export function sendMoviesRequest() {
  return {
    type: TYPES.SEND_MOVIES_REQUEST,
  }
}

export function addMovies(payload) {
  return {
    type: TYPES.ADD_MOVIES,
    payload,
  }
}

export function addMoviesToSelected(payload) {
  return {
    type: TYPES.ADD_MOVIES_TO_SELECTED_REQUEST,
    payload,
  }
}

export function deleteMovie(payload) {
  return {
    type: TYPES.DELETE_MOVIE_FROM_SELECTED_REQUEST,
    payload,
  }
}
