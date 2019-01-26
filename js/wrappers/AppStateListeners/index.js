import React from 'react'
import AppStateListeners from './AppStateListeners.container'

export default function (Component) {
  return function () {
    return (
      <AppStateListeners>
        <Component />
      </AppStateListeners>
    )
  }
}
