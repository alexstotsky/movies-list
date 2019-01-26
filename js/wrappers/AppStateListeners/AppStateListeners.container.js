import { connect } from 'react-redux'

import { setUI } from '../../actions/ui'

import AppStateListeners from './AppStateListeners.component'
import { disconnected, connected } from '../../actions/network'

function mapDispatchToProps(dispatch) {
  return {
    setWidth: (value) => {
      dispatch(setUI({ name: 'width', value }))
    },
    setHeight: (value) => {
      dispatch(setUI({ name: 'height', value }))
    },
    disconnected: () => {
      dispatch(disconnected())
    },
    connected: () => {
      dispatch(connected())
    },
  }
}

export default connect(null, mapDispatchToProps)(AppStateListeners)
