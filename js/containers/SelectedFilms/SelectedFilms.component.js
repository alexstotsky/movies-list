import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import Row from '../../components/FilmRow'

export default class SelectedFilms extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    selectedMovies: PropTypes.arrayOf(PropTypes.string),
    allMovies: PropTypes.shape({
      data: PropTypes.object.isRequired,
      ids: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  }

  static defaultProps = {
    allMovies: {
      data: {},
      ids: [],
    },
  }

  render() {
    const { width, selectedMovies, allMovies } = this.props
    const { data } = allMovies
    return (
      <ScrollView
        contentConatinerStyle={styles.container}
      >
        {
          selectedMovies.map((movieId, index) => (
            <Row key={index} movie={data[movieId]} width={width - 20} />
          ))
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet({
  container: {
    flex: 1,
  },
})
