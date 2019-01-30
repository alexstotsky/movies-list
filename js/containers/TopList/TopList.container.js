import { connect } from 'react-redux'

import { addMoviesToSelected } from '../../actions/movies'
import { setVisitedPage } from '../../actions/ui'

import TopListComponent from './TopList.component'

function mapStateToProps(state) {
  const { UI = {}, movies = {} } = state
  const { width, visited_pages = {} } = UI
  const { top_list } = visited_pages
  const { allMovies } = movies
  return {
    width,
    allMovies,
    wasVisited: top_list,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addMovieToSelected: (id) => {
      dispatch(addMoviesToSelected({ data: [id] }))
    },
    setVisited: () => {
      dispatch(setVisitedPage({ key: 'top_list', value: true }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopListComponent)
