import React from 'react'
import {
  Animated, Image, View, StyleSheet, PanResponder,
} from 'react-native'
import PropTypes from 'prop-types'

import { movie, defaultMovieObj } from '../../utils/commonPropTypes'
import COLORS from '../../constants/colors'

import Subtitle from '../Subtitle'
import LinkItem from '../LinkItem'
import Button from '../Button'

export default class FilmRow extends React.PureComponent {
  static propTypes = {
    width: PropTypes.number.isRequired,
    movie,
    movieId: PropTypes.string.isRequired,
    toggleScroll: PropTypes.func.isRequired,
    buttonLabel: PropTypes.string.isRequired,
    buttonRed: PropTypes.bool.isRequired,
    onButtonPress: PropTypes.func.isRequired,
  }

  static defaultProps = {
    defaultMovieObj,
    buttonRed: false,
    buttonLabel: '',
  }

  constructor(props) {
    super(props)
    this.state = {
      animatedValue: new Animated.Value(0),
    }
    this.isOpened = false
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) < Math.abs(gestureState.dy)) {
          return false
        }
        if (this.isOpened) {
          return gestureState.dx > 10
        }
        if (!this.isOpened) {
          return gestureState.dx < -10
        }
      },
      onPanResponderGrant: () => {
        const { toggleScroll } = this.props
        toggleScroll(false)
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx < -10) {
          this.execAnimation(1)
          return
        }
        if (gestureState.dx > 10) {
          this.execAnimation(0)
        }
      },
      onPanResponderRelease: () => {
        const { toggleScroll } = this.props
        toggleScroll(true)
      },
      onPanResponderTerminate: () => {
        const { toggleScroll } = this.props
        toggleScroll(true)
      },
    })
  }

  execAnimation = (toValue) => {
    const { animatedValue } = this.state
    const { toggleScroll } = this.props
    Animated.timing(
      animatedValue,
      {
        toValue,
        duration: 300,
        useNativeDriver: true,
      },
    ).start(() => {
      toggleScroll(true)
      this.isOpened = !!toValue
    })
  }

  onButtonPress = (id) => {
    const { onButtonPress } = this.props
    this.execAnimation(0)
    onButtonPress(id)
  }

  render() {
    const {
      width, movie, movieId, buttonRed, buttonLabel,
    } = this.props
    const {
      title, urlPoster, countries, year, genres, directors,
    } = movie
    const { animatedValue } = this.state
    return (
      <View
        style={[styles.container, { width }]}
      >
        <Animated.View
          style={[
            styles.contentContainer,
            {
              transform: [{
                translateX: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -70],
                }),
              }],
            },
          ]}
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
        <Animated.View
          style={[
            styles.buttonWrapper,
            {
              opacity: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ]}
        >
          <Button
            label={buttonLabel}
            onPress={() => this.onButtonPress(movieId)}
            red={buttonRed}
          />
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    borderBottomWidth: 1,
  },
  contentContainer: {
    paddingVertical: 5,
    position: 'relative',
    zIndex: 2,
    backgroundColor: COLORS.appBackground,
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
  buttonWrapper: {
    height: '100%',
    width: 70,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    justifyContent: 'center',
  },
})
