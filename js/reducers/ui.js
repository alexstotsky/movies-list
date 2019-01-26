import _isNull from 'lodash/isNull'
import _isArray from 'lodash/isArray'

import * as TYPES from '../types/ui'

const initialState = {}

export default function (state = initialState, action) {
  switch (action.type) {
    case TYPES.SET_UI_VALUE: {
      if (_isNull(action.payload)) {
        return state
      }
      const {
        value,
        section = 'unknown-section',
        key = 'unknown-key',
      } = action.payload
      let v = typeof value === 'object'
        ? _isArray(value)
          ? Object.assign([], value)
          : Object.assign({}, value)
        : value

      if (key !== 'unknown-key') {
        v = state[section] || {}
        v[key] = value
      }

      return {
        ...state,
        [section]: v,
      }
    }
    default:
      return state
  }
}
