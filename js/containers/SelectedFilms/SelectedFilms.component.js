import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import SortControls from '../../components/SortControls'
import Row from '../../components/FilmRow'
import { movie } from '../../utils/commonPropTypes'

export default class SelectedFilms extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    selectedMovies: PropTypes.arrayOf(movie).isRequired,
    deleteMovie: PropTypes.func.isRequired,
    activeControl: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    setSort: PropTypes.func.isRequired,
  }

  static defaultProps = {
    selectedMovies: [],
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
    const { activeControl, order } = this.props
    return Object.keys(this.controls).map((el) => {
      const control = this.controls[el]
      return {
        label: control.label,
        asc: order === 'asc',
        active: activeControl === el,
        iconUp: control.iconUp,
        iconDown: control.iconDown,
        onPress: () => this.onPressControl(el),
      }
    })
  }

  onPressControl = (controlName) => {
    const { activeControl, order, setSort } = this.props
    let value = ''
    if (activeControl === controlName) {
      value = `${controlName}-${order === 'asc' ? 'desc' : 'asc'}`
    } else {
      value = `${controlName}-asc`
    }
    setSort(value)
  }

  render() {
    const {
      width, selectedMovies, deleteMovie,
    } = this.props
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
          selectedMovies.map((movie, index) => (
            movie
              ? (
                <Row
                  key={index}
                  movie={movie}
                  width={width - 20}
                  toggleScroll={this.toggleScroll}
                  onButtonPress={deleteMovie}
                  movieId={movie.idIMDB}
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
