import React from 'react'
import {
  StyleSheet,
  ScrollView,
} from 'react-native'
import PropTypes from 'prop-types'

import PieChart from '../../components/PieChart'
import { movie } from '../../utils/commonPropTypes'

class Chart extends React.PureComponent {
  static propTypes = {
    width: PropTypes.number.isRequired,
    movies: PropTypes.arrayOf(movie).isRequired,
  }

  prepareData = () => {
    const { movies } = this.props
    const percents = {}
    const years = {}
    for (let movie of movies) {
      years[movie.year] = typeof years[movie.year] !== 'undefined'
        ? years[movie.year] + 1
        : 1
      percents[movie.year] = (years[movie.year] / movies.length) * 100
    }
    return Object.keys(percents)
      .map(year => ({ number: percents[year], name: year }))
      .sort((a, b) => (a.number > b.number ? -1 : 1))
  }

  render() {
    const { width } = this.props
    const data = this.prepareData()
    return (
      <ScrollView
        contentConatinerStyle={styles.container}
      >
        <PieChart
          data={data}
          pieWidth={width * 2 / 3}
          pieHeight={width * 2 / 3}
          innerRadius={30}
          selectedPadding={10}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
})

export default Chart
