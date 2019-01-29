import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import Row from '../../components/FilmRow'

export default class SelectedFilms extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    selectedMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
    allMovies: PropTypes.shape({
      data: PropTypes.object.isRequired,
      ids: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    deleteMovie: PropTypes.func.isRequired,
  }

  static defaultProps = {
    selectedMovies: [],
    allMovies: {
      data: {},
      ids: [],
    },
  }

  _scrollView = React.createRef()

  toggleScroll = (scrollEnabled) => {
    this._scrollView.current.setNativeProps({ scrollEnabled })
  }

  render() {
    const {
      width, selectedMovies, allMovies, deleteMovie,
    } = this.props
    const { data } = allMovies
    return (
      <ScrollView
        contentConatinerStyle={styles.container}
        ref={this._scrollView}
      >
        {
          selectedMovies.map((movieId, index) => (
            data[movieId]
              ? (
                <Row
                  key={index}
                  movie={data[movieId]}
                  width={width - 20}
                  toggleScroll={this.toggleScroll}
                  onButtonPress={deleteMovie}
                  movieId={movieId}
                  buttonRed
                  buttonLabel='Remove'
                />
              )
              : (
                null
              )
          ))
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
