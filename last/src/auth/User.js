import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, TextInput, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

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
        const { text, notices } = this.state;
        return (
            <SafeAreaView style={{ flex:1}}>
                <FlatList // FlatList in sebebi, girilen duyuru kadar ekrana veri basilmasini saglamak.
                data={notices} // Firebase den cekilen veri renderItem e gonderiliyor.
                    renderItem={this.renderItem} // Veri renderItem ile Notice.js e gidip ekrana text veriliyor.
                    style={style.flatlist} />
                <View style={style.container}>
                    <TouchableOpacity
                        onPress={() => this.signOut()}
                        style={style.button}
                    >
                        <Text style={style.buttonText}>Çıkış Yap</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
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