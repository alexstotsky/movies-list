import { connect } from 'react-redux'

import { deleteMovie } from '../../actions/movies'
import { setUI } from '../../actions/ui'

import SelectedFilms from './SelectedFilms.component'

function mapStateToProps(state) {
  const { UI = {}, movies = {} } = state
  const { width, height } = UI
  const { selectedMovies, allMovies, movieSort } = movies

  return {
    width,
    height,
    allMovies,
    selectedMovies,
    movieSort,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteMovie: (id) => {
      dispatch(deleteMovie({ id }))
    },
    setSort: (value) => {
      dispatch(setUI({ section: 'movieSort', value }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedFilms)
