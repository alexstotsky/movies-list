import PropTypes from 'prop-types'

export const styleSheet = PropTypes.oneOfType([PropTypes.object, PropTypes.number])

export const movie = PropTypes.shape({
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  directors: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  // writers: PropTypes.arrayOf(PropTypes.shape({
  //   name: PropTypes.string.isRequired,
  //   id: PropTypes.string.isRequired,
  // })).isRequired,
  // runtime: PropTypes.string.isRequired,
  urlPoster: PropTypes.string.isRequired,
  countries: PropTypes.arrayOf(PropTypes.string).isRequired,
  // languages: PropTypes.arrayOf(PropTypes.string).isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  // plot: PropTypes.string.isRequired,
  // simplePlot: PropTypes.string.isRequired,
  idIMDB: PropTypes.string.isRequired,
  urlIMDB: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  // metascore: PropTypes.string.isRequired,
  // rated: PropTypes.string.isRequired,
  // votes: PropTypes.string.isRequired,
  // type: PropTypes.string.isRequired,
  // ranking: PropTypes.number.isRequired,
})

export const defaultMovieObj = {
  title: '',
  year: '',
  releaseDate: '',
  directors: [{
    name: '',
    id: '',
  }],
  // writers: [{
  //   name: '',
  //   id: '',
  // }],
  // runtime: '',
  urlPoster: '',
  countries: [''],
  // languages: [''],
  genres: [''],
  // plot: '',
  // simplePlot: '',
  // idIMDB: '',
  urlIMDB: '',
  rating: '',
  // metascore: '',
  // rated: '',
  // votes: '',
  // type: '',
  // ranking: 0,
}
