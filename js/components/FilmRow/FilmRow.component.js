import React from 'react'
import {
  Animated, Image, View, StyleSheet, PanResponder,
} from 'react-native'
import PropTypes from 'prop-types'

import { movie, defaultMovieObj } from '../../utils/commonPropTypes'

import Title from '../Title'
import SubTitle from '../Subtitle'
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
      title, urlPoster, countries, year, genre, directors,
    } = movie
    return (
      <Animated.View
        style={[
          styles.container,
          styles.horizontal,
          { width },
        ]}
        {...this._panResponder.panHandlers}
      >
        <Image
          style={styles.image}
          source={{ uri: urlPoster }}
        />
        <Title
          title={title}
          titleStyle={styles.title}
        />
        <View style={styles.vertical}>
          <SubTitle subtitle={year} />
          <SubTitle subtitle={genre} />
          <View style={styles.horizontal}>
            {
              countries.map((country, index) => (
                <SubTitle key={index} subtitle={country} />
              ))
            }
          </View>
        </View>
        <View style={styles.vertical}>
          {
            directors.map((directorObj, index) => (
              <LinkItem
                key={index}
                title={directorObj.name}
                link={`https://www.imdb.com/name/${directorObj.id}`}
              />
            ))
          }
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet({
  container: {
    minHeight: 50,
  },
  title: {
    fontSize: 16,
  },
  image: {
    width: 40,
    resizeMode: 'contain',
  },
  horizontal: {
    flexDirection: 'row',
  },
  vertical: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
})
