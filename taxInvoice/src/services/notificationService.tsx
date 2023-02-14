import AsyncStorage from "@react-native-community/async-storage";
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

const getFcmToken = async() =>{
    let checkToken = await AsyncStorage.getItem('fcmToken');
    if(!checkToken){
        try{
            const fcmToken = await messaging().getToken();
            if(!!fcmToken){
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
            console.log('Fcm token generated: ', fcmToken);
        }catch (error){
            console.log('Error on get fcm token', error);
        }
    }
    
}

export const notificationListiner = async() =>{
    console.log('Notification listiner');
    messaging().onNotificationOpenedApp(remoteMessage =>{
        console.log('Notification caused app to open from background state: ', remoteMessage.notification,);
    });

    messaging().getInitialNotification()
    .then(remoteMessage => {
        if(remoteMessage){
            console.log('Notification caused app to open from quit state:', remoteMessage.notification);
        }
    });
}