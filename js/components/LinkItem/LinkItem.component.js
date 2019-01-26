import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import { styleSheet } from '../../utils/commonPropTypes'

class LinkItem extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    containerStyle: styleSheet,
    subtitleStyle: styleSheet,
  }

  static defaultProps = {
    subtitle: '',
  }

  onPress = (link) => {
    console.log(link)
  }

  render() {
    const {
      title, link, containerStyle, subtitleStyle,
    } = this.props
    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={() => this.onPress(link)}
      >
        <Text style={subtitleStyle}>
          {title}
        </Text>
      </TouchableOpacity>
    )
  }
}

export default LinkItem
