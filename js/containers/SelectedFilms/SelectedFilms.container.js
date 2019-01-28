import { connect } from 'react-redux'

import { deleteMovie } from '../../actions/movies'

import SelectedFilms from './SelectedFilms.component'

function mapStateToProps(state) {
  const { UI = {}, movies = {} } = state
  const { width, height } = UI
  const { selectedMovies, allMovies } = movies

  return {
    width,
    height,
    allMovies,
    selectedMovies,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteMovie: (id) => {
      dispatch(deleteMovie({ id }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedFilms)
