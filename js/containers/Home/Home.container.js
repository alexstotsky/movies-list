import { connect } from 'react-redux'

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

export default connect(mapStateToProps)(HomeComponent)
