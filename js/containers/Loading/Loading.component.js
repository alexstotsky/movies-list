import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'

import { goToApp } from '../../navigation'

import { getStorageItem } from '../../utils/storage'
import { VISITED_PAGES, SELECTED_MOVIES } from '../../var/keys'

import Title from '../../components/Title'

export default class Loading extends React.Component {
  static propTypes = {
    setVisited: PropTypes.func.isRequired,
    setSelectedMovies: PropTypes.func.isRequired,
    isLoaded: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    isLoaded: false,
  }

  gotData = false

  async componentDidMount() {
    const { setVisited, setSelectedMovies } = this.props
    const visitedPages = await getStorageItem(VISITED_PAGES)
    setVisited(JSON.parse(visitedPages))
    const selectedMovies = await getStorageItem(SELECTED_MOVIES)
    setSelectedMovies(JSON.parse(selectedMovies))
    this.onDataFromStorageReceived()
  }

  componentDidUpdate() {
    const { isLoaded } = this.props
    if (isLoaded && this.gotData) {
      goToApp()
    }
  }

  onDataFromStorageReceived() {
    this.gotData = true
    const { isLoaded } = this.props
    if (isLoaded) {
      goToApp()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#0000ff' />
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
