import * as TYPES from '../types/movies'

export function addMovies(payload) {
  return {
    type: TYPES.ADD_MOVIES,
    payload,
  }
}

export function addMovie(payload) {
  return {
    type: TYPES.ADD_MOVIE_TO_SELECTED,
    payload,
  }
}

export function addMultipleMovies(payload) {
  return {
    type: TYPES.ADD_MOVIES_TO_SELECTED,
    payload,
  }
}

export function deleteMovie(payload) {
  return {
    type: TYPES.DELETE_MOVIE_FROM_SELECTED,
    payload,
  }
}
