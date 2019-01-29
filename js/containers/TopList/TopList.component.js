import React from 'react'
import { ScrollView } from 'react-native'
import PropTypes from 'prop-types'

import Row from '../../components/FilmRow'

class TopList extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    allMovies: PropTypes.shape({
      data: PropTypes.object.isRequired,
      ids: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    addMovieToSelected: PropTypes.func.isRequired,
  }

  static defaultProps = {
    allMovies: {
      data: {},
      ids: [],
    },
  }

  _scrollView = React.createRef()

  toggleScroll = (scrollEnabled) => {
    this._scrollView.current.setNativeProps({ scrollEnabled })
  }

  render() {
    const { width, allMovies, addMovieToSelected } = this.props
    const { data, ids } = allMovies
    console.log(this.props)
    return (
      <ScrollView
        ref={this._scrollView}
      >
        {
          ids.map((movieId, index) => (
            <Row
              key={index}
              movie={data[movieId]}
              width={width - 20}
              toggleScroll={this.toggleScroll}
              onButtonPress={addMovieToSelected}
              movieId={movieId}
              buttonRed={false}
              buttonLabel='Add to selected'
            />
          ))
        }
      </ScrollView>
    )
  }
}

export default TopList
