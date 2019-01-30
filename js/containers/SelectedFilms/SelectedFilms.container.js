import { connect } from 'react-redux'

import { deleteMovie } from '../../actions/movies'
import { setMovieSort, setVisitedPage } from '../../actions/ui'

import SelectedFilms from './SelectedFilms.component'

function mapStateToProps(state) {
  const { UI = {}, movies = {} } = state
  const {
    width, height, sort_value = '', visited_pages = {},
  } = UI
  const { selected_films } = visited_pages
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
    wasVisited: selected_films,
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
    setVisited: () => {
      dispatch(setVisitedPage({ key: 'selected_films', value: true }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedFilms)
