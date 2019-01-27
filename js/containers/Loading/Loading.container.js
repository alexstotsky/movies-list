import { connect } from 'react-redux'

import _ from 'lodash'

import { setUI } from '../../actions/ui'
import { selectMultipleMovies, sendMoviesRequest } from '../../actions/movies'

import Loading from './Loading.component'

function mapStateToProps(state) {
  const { UI = {} } = state
  const { isLoaded } = UI
  return {
    isLoaded,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setVisited: (visitedPages) => {
      if (!_.isArray(visitedPages)) {
        console.error('[Loading container] setVisited() expects an Array')
        return
      }
      dispatch(setUI({
        section: 'visitedPages',
        value: visitedPages,
      }))
    },
    setSelectedMovies: (selectedMovies) => {
      if (!_.isArray(selectedMovies)) {
        console.error('[Loading container] setVisited() expects an Array')
        return
      }
      dispatch(selectMultipleMovies({ data: selectedMovies }))
    },
    sendMoviesRequest: () => {
      dispatch(sendMoviesRequest())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading)
