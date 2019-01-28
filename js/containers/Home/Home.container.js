import { connect } from 'react-redux'

import { addMovieToSelected } from '../../actions/movies'

import HomeComponent from './Home.component'

function mapStateToProps(state) {
  const { UI = {}, movies = {} } = state
  const { width } = UI
  const { allMovies } = movies
  return {
    width,
    allMovies,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addMovieToSelected: (id) => {
      dispatch(addMovieToSelected({ id }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)
