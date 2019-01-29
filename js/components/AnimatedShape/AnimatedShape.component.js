import React from 'react'
import {
  ART,
  LayoutAnimation,
} from 'react-native'

import Morph from 'art/morph/path'

const {
  Shape,
} = ART

const AnimationDurationMs = 200

export default class AnimatedShape extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      path: '',
    }
  }

  componentDidMount() {
    this.computeNextState(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.computeNextState(nextProps)
  }

  computeNextState(nextProps) {
    const graph = this.props.d()

    this.setState({
      path: graph.path,
    })

    if (!this.previousGraph) {
      this.previousGraph = graph
    }

    if (this.props !== nextProps) {
      const pathFrom = this.previousGraph.path
      const pathTo = graph.path

      cancelAnimationFrame(this.animating)
      this.animating = null

      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          AnimationDurationMs,
          LayoutAnimation.Types.easeInEaseOut,
          LayoutAnimation.Properties.opacity,
        ),
      )

      this.setState({
        path: Morph.Tween(
          pathFrom,
          pathTo,
        ),
      }, () => {
        this.animate()
      })

      this.previousGraph = graph
    }
  }

  animate(start) {
    this.animating = requestAnimationFrame((timestamp) => {
      if (!start) {
        start = timestamp
      }

      const delta = (timestamp - start) / AnimationDurationMs

      if (delta > 1) {
        this.animating = null
        this.setState({
          path: this.previousGraph.path,
        })

        return
      }

      this.setState(
        (state) => {
          const { path } = state
          path.tween(delta)
          return state
        },
        () => {
          this.animate(start)
        },
      )
    })
  }

  render() {
    const { color } = this.props
    const { path } = this.state
    return (
      <Shape
        d={path}
        stroke={color}
        fill={color}
      />
    )
  }
}
