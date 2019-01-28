import _isArray from 'lodash/isArray'
import _findIndex from 'lodash/findIndex'
import _slice from 'lodash/slice'
import _reduce from 'lodash/reduce'

import * as TYPES from '../types/movies'

const initialState = {
  selectedMovies: [],
  movies: {
    ids: [],
    data: {},
  },
}

export default function (state = initialState, action) {
  switch (action.type) {
    case TYPES.ADD_MOVIES: {
      const { data = {} } = action.payload
      const { movies } = data
      if (!_isArray(movies)) {
        console.warn('[ADD_MOVIES] data.movies should be an array', movies)
        return state
      }
      return {
        ...state,
        allMovies: _reduce(movies, (acc, value) => {
          const { idIMDB } = value
          if (!idIMDB) {
            return acc
          }
          acc.data[idIMDB] = { ...value }
          acc.ids.push(idIMDB)
          return acc
        }, { ids: [], data: {} }),
      }
    }
    case TYPES.ADD_MOVIE_TO_SELECTED: {
      const { id } = action.payload
      const index = _findIndex(state.selectedMovies, movieId => movieId === id)
      if (index !== -1) {
        return state
      }
      return {
        ...state,
        selectedMovies: [
          ...state.selectedMovies,
          id,
        ],
      }
    }
    case TYPES.DELETE_MOVIE_FROM_SELECTED: {
      const { id } = action.payload
      const index = _findIndex(state.selectedMovies, movieId => movieId === id)
      if (index === -1) {
        return state
      }
      return {
        ...state,
        selectedMovies: [
          ..._slice(state.selectedMovies, 0, index),
          ..._slice(state.selectedMovies, index + 1),
        ],
      }
    }
    case TYPES.ADD_MOVIES_TO_SELECTED: {
      const { data } = action.payload
      if (!_isArray(data)) {
        console.warn('[ADD_MOVIES_TO_SELECTED] data should be an array')
        return state
      }
      return {
        ...state,
        selectedMovies: [
          ...state.selectedMovies,
          ...data,
        ],
      }
    }
    default:
      return state
  }
}
