import { connect } from 'react-redux'

import { deleteMovie } from '../../actions/movies'

import SelectedFilms from './SelectedFilms.component'

function mapStateToProps(state) {
  const { UI = {}, movies = [] } = state
  const { width, height } = UI

  return {
    width,
    height,
    movies,
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
