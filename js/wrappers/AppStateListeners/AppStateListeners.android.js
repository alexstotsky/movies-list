import React from 'react'
import {
  SafeAreaView, NetInfo, StatusBar, StyleSheet, Dimensions,
} from 'react-native'
import PropTypes from 'prop-types'

import COLORS from '../../constants/colors'

const NO_CONNECTION_MARKER = 'none'

export default class AppStateListeners extends React.Component {
  static propTypes = {
    setHeight: PropTypes.func.isRequired,
    setWidth: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      shouldHideContent: false,
      hideContent: false,
    }
  }

  componentDidMount() {
    NetInfo.addEventListener('connectionChange', this.netInfoEvent)
    NetInfo.getConnectionInfo().then(connectionInfo => this.netInfoEvent(connectionInfo))
    Dimensions.addEventListener('change', this.handleRotation)
    const { setWidth, setHeight } = this.props
    setWidth(Dimensions.get('window').width)
    setHeight(Dimensions.get('window').height)
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.netInfoEvent)
    Dimensions.removeEventListener('change', this.handleRotation)
  }

  handleRotation = (dimensions) => {
    const { setWidth, setHeight } = this.props
    setWidth(dimensions.window.width)
    setHeight(dimensions.window.height)
  }

  netInfoEvent = (isConnected) => {
    const { connected, disconnected } = this.props
    if (isConnected.type === NO_CONNECTION_MARKER) {
      disconnected()
    } else {
      connected()
    }
  }

  render() {
    const { children } = this.props
    return (
      <SafeAreaView style={[styles.container, { paddingTop: StatusBar.currentHeight }]}>
        <StatusBar barStyle='dark-content' translucent backgroundColor='transparent' />
        {children}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.appBackground,
  },
})
