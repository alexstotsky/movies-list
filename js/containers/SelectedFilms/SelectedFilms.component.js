import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import { movie } from '../../utils/commonPropTypes'

import Row from '../../components/FilmRow'

export default class SelectedFilms extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    movies: PropTypes.arrayOf(movie).isRequired,
  }

  render() {
    const { width, movies } = this.props
    return (
      <ScrollView
        contentConatinerStyle={styles.container}
      >
        {
          movies.map((movie, index) => (
            <Row key={index} movie={movie} width={width - 60} />
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
