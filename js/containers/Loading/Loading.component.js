import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'

import COLORS from '../../constants/colors'

import Title from '../../components/Title'

export default class Loading extends React.Component {
  static propTypes = {
    isLoaded: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    isLoaded: false,
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color={COLORS.linkColor} />
        <Title title='Loading' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
