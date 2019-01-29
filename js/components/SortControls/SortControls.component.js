import React from 'react'
import {
  View, TouchableOpacity, StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Octicons'
import PropTypes from 'prop-types'

import { styleSheet } from '../../utils/commonPropTypes'

import SubTitle from '../Subtitle'

class SortControls extends React.Component {
  static propTypes = {
    containerStyle: styleSheet,
    direction: PropTypes.oneOf(['row', 'column']).isRequired,
    controls: PropTypes.arrayOf(PropTypes.shape({
      iconUp: PropTypes.shape({
        group: PropTypes.string,
        name: PropTypes.string,
      }),
      iconDown: PropTypes.shape({
        group: PropTypes.string,
        name: PropTypes.string,
      }),
      asc: PropTypes.bool,
      active: PropTypes.bool,
      label: PropTypes.string,
      controlStyle: styleSheet,
      onPress: PropTypes.func.isRequired,
    })).isRequired,
  }

  static defaultProps = {
    direction: 'row',
    controls: [],
  }

  render() {
    const { direction, containerStyle, controls } = this.props
    return (
      <View style={[styles[direction], containerStyle]}>
        {
          controls.map((control, index) => {
            return (
              <View key={index} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={styles.row} onPress={control.onPress}>
                  <SubTitle subtitle={control.label} />
                  {
                    control.active
                      ? (control.asc
                        ? <Icon size={15} name={control.iconUp.name} color='black' />
                        : <Icon size={15} name={control.iconDown.name} color='black' />
                      )
                      : <Icon size={15} name={control.iconUp.name} color='gray' />
                  }
                </TouchableOpacity>
              </View>
            )
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
})

export default SortControls
