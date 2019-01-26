import { combineReducers } from 'redux'

import UI from './ui'
import movies from './movies'

export default combineReducers({
  UI,
  movies,
})
