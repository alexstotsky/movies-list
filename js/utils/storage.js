import { AsyncStorage, Alert } from 'react-native'

export function getStorageItem(key) {
  return new Promise((res) => {
    AsyncStorage.getItem(key)
      .then((val) => {
        res(val)
      })
      .catch((e) => {
        Alert.alert('Error', `An error occurred while getting selected movies:\n${e.toString}`)
        res('[]')
      })
  })
}

export function setStorageItem(key, value) {
  return new Promise((res) => {
    AsyncStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
      .then(() => {
        res()
      })
      .catch((e) => {
        Alert.alert('Error', `An error occurred while setting selected movies:\n${e.toString}`)
        res()
      })
  })
}
