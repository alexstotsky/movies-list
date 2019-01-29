import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import SortControls from '../../components/SortControls'
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
    movieSort: PropTypes.string.isRequired,
    setSort: PropTypes.func.isRequired,
  }

  static defaultProps = {
    selectedMovies: [],
    allMovies: {
      data: {},
      ids: [],
    },
    movieSort: 'title-asc',
  }

  controls = {
    title: {
      label: 'Title',
      iconUp: {
        name: 'triangle-up',
      },
      iconDown: {
        name: 'triangle-down',
      },
    },
    releaseDate: {
      label: 'Release date',
      iconUp: {
        name: 'triangle-up',
      },
      iconDown: {
        name: 'triangle-down',
      },
    },
  }

  _scrollView = React.createRef()

  toggleScroll = (scrollEnabled) => {
    this._scrollView.current.setNativeProps({ scrollEnabled })
  }

  prepareControls = () => {
    const { movieSort } = this.props
    const [activeControl, asc] = movieSort.split('-')
    return Object.keys(this.controls).map((el) => {
      const control = this.controls[el]
      return {
        label: control.label,
        asc: asc === 'asc',
        active: activeControl === el,
        iconUp: control.iconUp,
        iconDown: control.iconDown,
        onPress: () => this.onPressControl(el),
      }
    })
  }

  onPressControl = (controlName) => {
    const { movieSort } = this.props
    const [activeControl, asc] = movieSort.split('-')
    let value = ''
    if (activeControl === controlName) {
      value = `${controlName}-${asc === 'asc' ? 'desc' : 'asc'}`
    } else {
      value = `${controlName}-asc`
    }
    console.log(value)
  }

  render() {
    const {
      width, selectedMovies, allMovies, deleteMovie,
    } = this.props
    const { data } = allMovies
    const controlsObj = this.prepareControls()
    return (
      <ScrollView
        contentConatinerStyle={styles.container}
        ref={this._scrollView}
      >
        <SortControls
          direction='row'
          controls={controlsObj}
        />
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
