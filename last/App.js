import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import { View, Text } from 'react-native'
import firebase from 'firebase'



const firebaseConfig = {
  apiKey: "AIzaSyB_iaPF9xd2V0VxLnOEMlcX7flIR0x3_Ow",
  authDomain: "bitirme-fb2ac.firebaseapp.com",
  databaseURL: "https://bitirme-fb2ac-default-rtdb.firebaseio.com",
  projectId: "bitirme-fb2ac",
  storageBucket: "bitirme-fb2ac.appspot.com",
  messagingSenderId: "215619638197",
  appId: "1:215619638197:web:be9c5d941f6df91bb3fffc",
  measurementId: "G-1HDVF602SZ"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import LandingScreen from './src/auth/Landing'
import RegisterScreen from './src/auth/Register'
import LoginScreen from './src/auth/Login'


global.isFromAdminAccount=false;


import AdminScreen, { Admin } from './src/auth/Admin'
import UserScreen, { User } from './src/auth/User'

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => { // Kullanıcı girisi var mı cikis yapmis mi kontrolu
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() { // SplashScreen mantıgı bekleme anında yazı veriyor(Silinebilir)
    const { loggedIn, loaded } = this.state;
    if(!loaded){
      return(
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Yükleniyor..</Text>
        </View>
      )
    }
    if(!loggedIn){ // Kullanıcı girisi yoksa yonlendirme icin(Kayıt ol, Giriş yap)
      // <Stack.Navigator initialRouteName="Login"> satırını Login yerine Landing yapıyorduk Direk kayıt ekranına çektim.
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false}} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}} />
            <Stack.Screen name="Admin" component={Admin} options={{ headerShown: false}} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    if(isFromAdminAccount)
    {
      return( // Kullanıcı girisi varsa admin ekranına yonlendirme yapıyor.

      
        <AdminScreen/>
        //<UserScreen/>
      )
    }
    else{
      return( // Kullanıcı girisi varsa admin ekranına yonlendirme yapıyor.

      
        
        <UserScreen/>
      )
    }
    
  }
}

export default App

