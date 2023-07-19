//@ts-nocheck
import React, {Component, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import NotificationController from './src/components/NotificationController';

class App extends Component {
  componentDidMount(): void {
    this.getToken();
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage))
      
    });
    return unsubscribe;
  }
  getToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      Alert.alert(fcmToken);
    }
  };

  render() {
    return (
      <View style={styles.Container}>
        <NotificationController />
        <Text style={styles.paragraph}>
          Push Notification With Firebasse Demo{' '}
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  paragraph: {
    textAlign: 'center',
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
});
export default App;
