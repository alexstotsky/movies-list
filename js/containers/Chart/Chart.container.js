import { connect } from 'react-redux'

import ChartComponent from './Chart.component'

function mapStateToProps(state) {
  const { UI = {}, movies: moviesReducer = {} } = state
  const { width } = UI
  const { allMovies = {} } = moviesReducer
  const { data, ids } = allMovies
  const movies = ids.map(id => data[id])
  return {
    width,
    movies,
  }
}

export default connect(mapStateToProps)(ChartComponent)
