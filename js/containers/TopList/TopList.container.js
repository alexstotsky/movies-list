import { connect } from 'react-redux'

import { addMoviesToSelected } from '../../actions/movies'

import TopListComponent from './TopList.component'

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
      dispatch(addMoviesToSelected({ data: [id] }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopListComponent)
