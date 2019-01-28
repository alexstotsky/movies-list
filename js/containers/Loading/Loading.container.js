import { connect } from 'react-redux'

import _ from 'lodash'

import { setUI } from '../../actions/ui'
import { selectMultipleMovies } from '../../actions/movies'

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
      let data = visitedPages
      if (!_.isArray(data)) {
        console.log('[Loading container] setVisited() expects an Array', data)
        data = []
      }
      dispatch(setUI({
        section: 'visitedPages',
        value: data,
      }))
    },
    setSelectedMovies: (selectedMovies) => {
      let data = selectedMovies
      if (!_.isArray(data)) {
        console.log('[Loading container] setSelectedMovies() expects an Array', data)
        data = []
      }
      dispatch(selectMultipleMovies({ data }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading)
