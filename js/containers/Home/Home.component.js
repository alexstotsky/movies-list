import React from 'react'
import { ScrollView } from 'react-native'
import PropTypes from 'prop-types'

import Row from '../../components/FilmRow'

class Home extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    allMovies: PropTypes.shape({
      data: PropTypes.object.isRequired,
      ids: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  }

  static defaultProps = {
    allMovies: {
      data: {},
      ids: [],
    },
  }

  render() {
    const { width, allMovies } = this.props
    const { data, ids } = allMovies
    return (
      <ScrollView>
        {
          ids.map((movieId, index) => (
            <Row key={index} movie={data[movieId]} width={width - 20} />
          ))
        }
      </ScrollView>
    )
  }
}

export default Home
