import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import { getStorageItem } from '../../utils/storage'
import { VISITED_PAGES, SELECTED_MOVIES } from '../../var/keys'

import Title from '../../components/Title'

export default class Loading extends React.Component {
  static propTypes = {
    sendMoviesRequest: PropTypes.func.isRequired,
    setVisited: PropTypes.func.isRequired,
    setSelectedMovies: PropTypes.func.isRequired,
    isLoaded: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    isLoaded: false,
  }

  async componentDidMount() {
    const { setVisited, setSelectedMovies, sendMoviesRequest } = this.props
    sendMoviesRequest()
    const visitedPages = await getStorageItem(VISITED_PAGES)
    setVisited(JSON.parse(visitedPages))
    const selectedMovies = await getStorageItem(SELECTED_MOVIES)
    setSelectedMovies(JSON.parse(selectedMovies))
  }

  render() {
    return (
      <View style={styles.container}>
        <Title title='Loading' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
})
