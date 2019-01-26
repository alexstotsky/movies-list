import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'

import HomeScreen from './containers/Home'

import store from './store'
import wrapper from './wrappers/AppStateListeners'

export function registerScreens() {
  Navigation.registerComponentWithRedux(
    'homeScreen',
    () => wrapper(HomeScreen),
    Provider,
    store,
  )
}
