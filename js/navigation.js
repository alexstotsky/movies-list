import { Navigation } from 'react-native-navigation'

export const goToApp = () => Navigation.setRoot({
  root: {
    bottomTabs: {
      children: [
        {
          component: {
            name: 'homeScreen',
            options: {
              bottomTab: {
                fontSize: 14,
                text: 'Top 20',
              },
            },
          },
        },
      ],
    },
  },
})
