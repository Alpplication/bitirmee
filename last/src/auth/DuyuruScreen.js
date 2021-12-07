import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, TextInput, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import WeeklyCalendar from 'react-native-weekly-calendar';
//import { LocaleConfig, Calendar  } from 'react-native-calendars';


import firebase from 'firebase'
import "firebase/database"
import LandingScreen from './Landing'
import LoginScreen from './Login'
import Notice from './Notice'

export class User extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            notices:[],
            text:'',
            sampleEvents: [
                { 'start': '2020-03-23 09:00:00', 'duration': '00:20:00', 'note': 'Walk my dog' },
                { 'start': '2020-03-24 14:00:00', 'duration': '01:00:00', 'note': 'Doctor\'s appointment' },
                { 'start': '2020-03-25 08:00:00', 'duration': '00:30:00', 'note': 'Morning exercise' },
                { 'start': '2020-03-25 14:00:00', 'duration': '02:00:00', 'note': 'Meeting with client' },
                { 'start': '2020-03-25 19:00:00', 'duration': '01:00:00', 'note': 'Dinner with family' },
                { 'start': '2020-03-26 09:30:00', 'duration': '01:00:00', 'note': 'Schedule 1' },
                { 'start': '2020-03-26 11:00:00', 'duration': '02:00:00', 'note': 'Schedule 2' },
                { 'start': '2020-03-26 15:00:00', 'duration': '01:30:00', 'note': 'Schedule 3' },
                { 'start': '2020-03-26 18:00:00', 'duration': '02:00:00', 'note': 'Schedule 4' },
                { 'start': '2020-03-26 22:00:00', 'duration': '01:00:00', 'note': 'Schedule 5' }
              ],
        }
    }

    // Firebase Database e eklenen mesajı cektigimiz alan.
    // Firebase Database de notices basligi altindaki userName e gore saklanan verileri cekiyor.
    // Cekilen veriler; UserName, UserId, girilen mesaj(text) ve verinin id si seklinde.
    componentDidMount(){
        firebase.database().ref(`notices/${firebase.auth().currentUser.uid}`).on('value', snapshot => {
            var notices = [];
            snapshot.forEach((item) => {
                notices.push({
                    text:item.val().text,
                    userName:item.val().userName,
                    userId:item.val().userID,
                    id:item.key
                })
            })
            this.setState({notices});
            console.log(notices) // Database den cekilen verileri gosteriyor.
        });
    }
    // Ekranın altındaki cıkıs yap butonu ile kullanıcı cıkısı yapmayı ve firebase hesabından
    // cıkısı saglayan fonksiyon.
    // LandingScreen e yonlendiriyor, oradan da kayıt ol ve giriş yap seceneklerine erisiliyor.
    signOut(){
        firebase.auth()
        .signOut()
        .then(() => console.log('User signed out!')); // Burası direk giriş ekranına yonlendirecek.
    }
    renderItem = ({ item }) => {
        return <Notice item={item}/>
    }
    render() {
        const { text, notices, sampleEvents } = this.state;
        return (
            <View style={style.container}>
                <WeeklyCalendar events={this.state.sampleEvents} style={{ height: 400 }} />
            </View>
        )
    }
}

export default User

const style = StyleSheet.create({
    flatlist:{
      padding:50,
      backgroundColor:'#F7F9FA',
      flex:1
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    input_area:{
      flexDirection:'column',
      justifyContent:'flex-end',
      padding:30,
      backgroundColor:'grey'
    },
    forText:{
      padding:10,
      backgroundColor:'yellow',
      flex:1
    },
  
    container: {
      //flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
     button: {
        backgroundColor: 'grey',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding:20,
        marginTop:45,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        //alignItems:'center'
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    input:{
        backgroundColor:'#F7F7F7',
        padding:15,
        width:300,
        height:50,
        borderRadius:10,
        paddingHorizontal:100,
        marginBottom:10
    }
  })