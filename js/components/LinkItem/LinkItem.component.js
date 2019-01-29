import React from 'react'
import {
  Text, TouchableOpacity, Linking, StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'
import InAppBrowser from 'react-native-inappbrowser-reborn'

import COLORS from '../../constants/colors'

import { styleSheet } from '../../utils/commonPropTypes'

class LinkItem extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    containerStyle: styleSheet,
    labelStyle: styleSheet,
  }

  static defaultProps = {
    title: '',
  }

  onPress = async (link) => {
    const isAvailable = await InAppBrowser.isAvailable()
    if (isAvailable) {
      InAppBrowser.open(link, {
        // iOS Properties
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: '#dadada',
        preferredControlTintColor: '#273236',
        readerMode: false,
        // Android Properties
        showTitle: true,
        toolbarColor: '#273236',
        secondaryToolbarColor: '#273236',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
      })
        .then(() => {})
        .catch(err => console.warn('[InAppBrowser] returned following error:\n', err))
    } else {
      Linking.openURL(link)
    }
  }

  render() {
    const {
      label, link, containerStyle, labelStyle,
    } = this.props
    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={() => this.onPress(link)}
      >
        <Text style={[styles.text, labelStyle]}>
          {label}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: COLORS.linkColor,
  },
})

export default LinkItem
