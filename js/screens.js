import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'

import LoadingScreen from './containers/Loading'
import TopListScreen from './containers/TopList'
import SelectedFilmsScreen from './containers/SelectedFilms'
import ChartScreen from './containers/Chart'

import store from './store'
import wrapper from './wrappers/AppStateListeners'

export function registerScreens() {
  Navigation.registerComponentWithRedux(
    'loadingScreen',
    () => wrapper(LoadingScreen),
    Provider,
    store,
  )
  Navigation.registerComponentWithRedux(
    'topListScreen',
    () => wrapper(TopListScreen),
    Provider,
    store,
  )
  Navigation.registerComponentWithRedux(
    'selectedFilmsScreen',
    () => wrapper(SelectedFilmsScreen),
    Provider,
    store,
  )
  Navigation.registerComponentWithRedux(
    'chartScreen',
    () => wrapper(ChartScreen),
    Provider,
    store,
  )
}
