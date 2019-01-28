import React from 'react'
import {
  Animated, Image, View, StyleSheet, PanResponder,
} from 'react-native'
import PropTypes from 'prop-types'

import { movie, defaultMovieObj } from '../../utils/commonPropTypes'

import Subtitle from '../Subtitle'
import LinkItem from '../LinkItem'

export default class FilmRow extends React.PureComponent {
  static propTypes = {
    width: PropTypes.number.isRequired,
    movie,
  }

  static defaultProps = {
    defaultMovieObj,
  }

  constructor(props) {
    super(props)
    this.state = {
      animatedValue: new Animated.Value(0),
    }
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) > 10) {
          return true
        }
      },
      onPanResponderGrant: () => {},
      onPanResponderMove: () => {},
      onPanResponderRelease: () => {},
    })
  }

  render() {
    const { width, movie } = this.props
    const {
      title, urlPoster, countries, year, genres, directors,
    } = movie
    return (
      <Animated.View
        style={[styles.container, { width }]}
        {...this._panResponder.panHandlers}
      >
        <View style={styles.contentWrapper}>
          <Image
            style={styles.image}
            source={{ uri: urlPoster }}
          />
          <View style={styles.descriptionBlock}>
            <Subtitle subtitle={`${title} (${year})`} containerStyle={styles.title} />
            <View style={styles.descriptionRow}>
              {
                genres.map((genre, index) => (
                  <Subtitle
                    key={index}
                    subtitle={index === 0 ? genre : `, ${genre}`}
                  />
                ))
              }
            </View>
            <View style={styles.descriptionRow}>
              {
                countries.map((country, index) => (
                  <Subtitle
                    key={index}
                    subtitle={index === 0 ? country : `, ${country}`}
                  />
                ))
              }
            </View>
            <View style={styles.descriptionRow}>
                {
                  directors.map((directorObj, index) => (
                    <LinkItem
                      key={index}
                      label={index === 0 ? directorObj.name : `, ${directorObj.name}`}
                      link={`https://www.imdb.com/name/${directorObj.id}`}
                    />
                  ))
                }
            </View>
          </View>
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    borderBottomWidth: 1,
    alignSelf: 'center',
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  descriptionBlock: {
    flex: 1,
    width: '100%',
  },
  image: {
    width: 50,
    resizeMode: 'contain',
    marginRight: 5,
  },
  title: {
    flex: 1,
    width: '100%',
  },
  descriptionRow: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
})
