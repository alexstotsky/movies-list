import { connect } from 'react-redux'

import { deleteMovie } from '../../actions/movies'
import { setMovieSort } from '../../actions/ui'

import SelectedFilms from './SelectedFilms.component'

function mapStateToProps(state) {
  const { UI = {}, movies = {} } = state
  const { width, height, sort_value = '' } = UI
  const { selectedMovies, allMovies } = movies
  const { data } = allMovies

  const [activeControl = '', order = ''] = sort_value.split('-')
  const sortedMovies = selectedMovies.map(el => data[el])
    .sort((a, b) => {
      if (order === 'asc') {
        return a[activeControl] < b[activeControl] ? 1 : -1
      }
      return a[activeControl] > b[activeControl] ? 1 : -1
    })
  return {
    width,
    height,
    selectedMovies: sortedMovies,
    activeControl,
    order,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteMovie: (id) => {
      dispatch(deleteMovie({ id }))
    },
    setSort: (value) => {
      dispatch(setMovieSort({ value }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedFilms)
