import { YellowBox } from 'react-native'

import { Navigation } from 'react-native-navigation'
import { registerScreens } from './js/screens'

YellowBox.ignoreWarnings(['Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).'])

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'loadingScreen',
      },
    },
  })
})
