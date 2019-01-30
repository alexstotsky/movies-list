import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ART,
  TouchableWithoutFeedback,
} from 'react-native'
import PropTypes from 'prop-types'

import * as scale from 'd3-scale'
import * as shape from 'd3-shape'

import AnimatedShape from '../AnimatedShape'

import COLORS from '../../constants/colors'
import { getRandomColor } from '../../utils/color'

const {
  Surface,
  Group,
} = ART

const d3 = {
  scale,
  shape,
}

const margin = 10

class PieChart extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      number: PropTypes.number,
      name: PropTypes.string,
    })).isRequired,
    pieWidth: PropTypes.number.isRequired,
    pieHeight: PropTypes.number.isRequired,
    innerRadius: PropTypes.number.isRequired,
    selectedPadding: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      highlightedIndex: 0,
    }
    this.colors = props.data.map((item, index) => COLORS.chart[index] || getRandomColor())
  }

  _value = item => item.number

  _label = item => item.name

  _color = index => this.colors[index]

  _createPieChart = (index) => {
    const {
      data, pieWidth, innerRadius, selectedPadding,
    } = this.props
    const { highlightedIndex } = this.state
    const arcs = d3.shape.pie()
      .value(this._value)(data)

    const hightlightedArc = d3.shape.arc()
      .outerRadius(pieWidth / 2)
      .padAngle(0.05)
      .innerRadius(innerRadius)

    const arc = d3.shape.arc()
      .outerRadius(pieWidth / 2 - selectedPadding)
      .padAngle(0.05)
      .innerRadius(innerRadius)

    const arcData = arcs[index]
    const path = (highlightedIndex === index) ? hightlightedArc(arcData) : arc(arcData)

    return {
      path,
      color: this._color(index),
    }
  }

  _onPieItemSelected = (index) => {
    const { onItemSelected = () => {} } = this.props
    this.setState({
      highlightedIndex: index,
    })
    onItemSelected(index)
  }

  render() {
    const {
      data, pieWidth, pieHeight,
    } = this.props
    const { highlightedIndex } = this.state
    const x = (pieWidth + margin) / 2
    const y = (pieWidth + margin) / 2
    return (
      <View style={styles.container}>
        <View style={{ width: pieWidth + margin, height: pieHeight + margin }}>
          <Surface
            width={pieWidth + margin}
            height={pieHeight + margin}
          >
            <Group x={x} y={y}>
              {
                data.map((item, index) => (
                  <AnimatedShape
                    key={`pie_chart_${index}`}
                    color={this._color(index)}
                    d={() => this._createPieChart(index)}
                  />
                ))
              }
            </Group>
          </Surface>
        </View>
        <View style={styles.legend}>
          {
            data.map((item, index) => {
              const fontWeight = highlightedIndex === index ? 'bold' : 'normal'
              return (
                <TouchableWithoutFeedback key={index} onPress={() => this._onPieItemSelected(index)}>
                  <View>
                    <Text
                      style={[
                        styles.label,
                        {
                          color: this._color(index),
                          fontWeight,
                        },
                      ]}
                    >
                      {`${this._label(item)}: ${this._value(item)}%`}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              )
            })
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  legend: {
    flex: 1,
    paddingLeft: 10,
  },
  label: {
    marginTop: 5,
  },
})

export default PieChart
