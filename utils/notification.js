import {AsyncStorage} from 'react-native'
import { Notifications, Permissions } from 'expo'
export const NOTIFICATION_KEY = "KEY_NOTIFICATION";

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
  .then(JSON.parse)
  .then(data => {
    if (data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS)
      .then(({status}) => {
        if (status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync();

          let next = new Date();
          next.setDate(next.getDate() + 1);
          Notifications.scheduleLocalNotificationAsync(
            createLocalNotification(),
            {
              time: next,
              repeat: 'day'
            }
          )
          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
        }
      })
    }
  })
}


function createLocalNotification() {
  return {
    title: "Let's do the quiz",
    body: "Don't forget to the do quiz",
    ios:{
      sound:true,
    },
    android: {
      sound:true,
      priority:"high",
      sticky:false,
      vibrate:true,
    }
  }
}

export function clearLocalNotification() {
  return AsyncStorage.getItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync());
}
