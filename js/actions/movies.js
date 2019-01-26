import { ADD_MOVIE_TO_SELECTED, DELETE_MOVIE_FROM_SELECTED } from '../types/movies'

export function addMovie(payload) {
  return {
    type: ADD_MOVIE_TO_SELECTED,
    payload,
  }
}

export function deleteMovie(payload) {
  return {
    type: DELETE_MOVIE_FROM_SELECTED,
    payload,
  }
}
