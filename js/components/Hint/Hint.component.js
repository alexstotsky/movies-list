import React from 'react'
import {
  Animated, View, Text, TouchableOpacity, StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'

import COLORS from '../../constants/colors'
import Button from '../Button'

class Hint extends React.PureComponent {
  static propTypes = {
    width: PropTypes.number.isRequired,
    buttonLabel: PropTypes.string.isRequired,
    onPressClose: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      animatedValue: new Animated.Value(0),
    }
  }

  componentDidMount() {
    this.execAnimation(1)
  }

  execAnimation = (toValue) => {
    const { animatedValue } = this.state
    Animated.timing(
      animatedValue,
      {
        toValue,
        duration: 2000,
        useNativeDriver: true,
      },
    ).start(() => {
      this.execAnimation(toValue === 0 ? 1 : 0)
    })
  }

  render() {
    const { width, buttonLabel, onPressClose } = this.props
    const { animatedValue } = this.state
    return (
      <View style={[styles.container, { width }]}>
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
        >
          <View style={styles.contentWrapper}>
            <View style={styles.image} />
            <View style={styles.descriptionBlock}>
              <View style={[styles.title, styles.placeholder]} />
              <View style={styles.descriptionRow}>
                <View style={[styles.item, styles.placeholder]} />
                <View style={[styles.item, styles.placeholder]} />
              </View>
              <View style={styles.descriptionRow}>
                <View style={[styles.smallItem, styles.placeholder]} />
                <View style={[styles.smallItem, styles.placeholder]} />
                <View style={[styles.smallItem, styles.placeholder]} />
              </View>
              <View style={styles.descriptionRow}>
                <View style={[styles.item, styles.placeholder]} />
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
            onPress={() => {}}
            disabled
            buttonStyle={styles.button}
          />
        </Animated.View>
        <View style={styles.closeButtonBlock}>
          <TouchableOpacity onPress={onPressClose} style={styles.row}>
            <Text style={styles.text}>
              Got it
            </Text>
            <Icon name='md-close-circle' size={16} color={COLORS.greenButton} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.lightgray,
  },
  contentContainer: {
    paddingVertical: 5,
    position: 'relative',
    alignItems: 'center',
    zIndex: 2,
    backgroundColor: COLORS.appBackground,
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  descriptionBlock: {
    flex: 1,
    width: '100%',
  },
  image: {
    width: 50,
    height: 70,
    marginRight: 5,
    backgroundColor: COLORS.lightgray,
  },
  title: {
    height: 12,
    width: '60%',
  },
  descriptionRow: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  item: {
    height: 10,
    width: '30%',
    marginRight: 5,
  },
  smallItem: {
    height: 10,
    width: '15%',
    marginRight: 5,
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
  button: {
    backgroundColor: COLORS.lightgray,
  },
  placeholder: {
    marginVertical: 2,
    backgroundColor: COLORS.lightgray,
    borderRadius: 5,
  },
  closeButtonBlock: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: COLORS.greenButton,
    fontSize: 15,
    fontWeight: '400',
    marginRight: 5,
  },
})

export default Hint
