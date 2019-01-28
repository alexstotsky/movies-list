import { Navigation } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/Feather'

import COLORS from './constants/colors'

export const goToApp = async () => {
  const top20Icon = await Icon.getImageSource('trending-up', 30, 'gray')
  const chartIcon = await Icon.getImageSource('pie-chart', 30, 'gray')
  const selectedFilmsIcon = await Icon.getImageSource('filter', 30, 'gray')
  return (
    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: [
            {
              component: {
                name: 'topListScreen',
                options: {
                  bottomTab: {
                    fontSize: 14,
                    text: 'Top 20',
                    icon: top20Icon,
                    selectedIconColor: COLORS.activeItemColor,
                    selectedTextColor: COLORS.activeItemColor,
                  },
                },
              },
            },
            {
              component: {
                name: 'selectedFilmsScreen',
                options: {
                  bottomTab: {
                    fontSize: 14,
                    text: 'Selected',
                    icon: selectedFilmsIcon,
                    selectedIconColor: COLORS.activeItemColor,
                    selectedTextColor: COLORS.activeItemColor,
                  },
                },
              },
            },
          ],
        },
      },
    })
  )
}
