import React from 'react'
import { ScrollView } from 'react-native'
import PropTypes from 'prop-types'

import Row from '../../components/FilmRow'
import Hint from '../../components/Hint'

class TopList extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    allMovies: PropTypes.shape({
      data: PropTypes.object.isRequired,
      ids: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    addMovieToSelected: PropTypes.func.isRequired,
    setVisited: PropTypes.func.isRequired,
    wasVisited: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    allMovies: {
      data: {},
      ids: [],
    },
    wasVisited: false,
  }

  _scrollView = React.createRef()

  toggleScroll = (scrollEnabled) => {
    this._scrollView.current.setNativeProps({ scrollEnabled })
  }

  render() {
    const {
      width, allMovies, addMovieToSelected, setVisited, wasVisited,
    } = this.props
    const { data, ids } = allMovies
    const buttonLabel = 'Add to selected'
    return (
      <ScrollView
        ref={this._scrollView}
      >
        {
          !wasVisited && (
            <Hint
              width={width - 20}
              buttonLabel={buttonLabel}
              onPressClose={setVisited}
            />
          )
        }
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
              buttonLabel={buttonLabel}
            />
          ))
        }
      </ScrollView>
    )
  }
}

export default TopList
