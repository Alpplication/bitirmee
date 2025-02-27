import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, TextInput, FlatList , CheckBox} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

import firebase from 'firebase'
import "firebase/database"
import LandingScreen from './Landing'
import LoginScreen from './Login'
import Notice from './Notice'
import { Input } from 'react-native-elements/dist/input/Input'
import { Button } from 'react-native-elements/dist/buttons/Button'

export class Admin extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            notices:[],
            noticeTitle:'',
            text:'',
        }
    }
    // Firebase Database e eklenen mesajı cektigimiz alan.
    // Firebase Database de notices basligi altindaki userName e gore saklanan verileri cekiyor.
    // Cekilen veriler; UserName, UserId, girilen mesaj(text) ve verinin id si seklinde.
    componentDidMount(){
        /*firebase.database().ref(`notices/${firebase.auth().currentUser.uid}`).on('value', snapshot => {
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
        });*/
    }
    // Ekranın altındaki cıkıs yap butonu ile kullanıcı cıkısı yapmayı ve firebase hesabından
    // cıkısı saglayan fonksiyon.
    // LandingScreen e yonlendiriyor, oradan da kayıt ol ve giriş yap seceneklerine erisiliyor.
    signOut(){
        firebase.auth()
        .signOut()
        .then(() => console.log('User signed out!')); // Burası direk giriş ekranına yonlendirecek.
    }
    /*renderItem = ({ item }) => {
        return <Notice item={item}/>
    }*/
    // Duyuru giriniz alanına girilen metni firebase database e ekliyor.
    // Firebase Database ekranında notices basligi altinda userID ye gore ekleniyor.
    // Eklenen data nın icerigi; userName, userID, girilen mesaj(text) seklinde.
    handleSend = () => {
        const { text, noticeTitle } = this.state;
        const user = firebase.auth().currentUser;
        const userID = user.uid;
        const userName = user.displayName;
        const userMail = user.email;
        var database = firebase.database().ref(`notices/${userID}`);
        database.push({
            userName,
            userID,
            text,
            noticeTitle
        }).then((result) => {
            this.setState({ text : '', noticeTitle : ''}) // Girilen metin firebase e aktarilirsa text in icini bosaltiyor.
        }).catch((error) => console.log(error));
    }

    render() {
        const { text,noticeTitle, notices } = this.state;
        return (
            <View style={{ flex:1}}>


<Button onPress={this.handleSend}>
                    <Icon name='adn'></Icon>
                </Button>
                <Input
                value={noticeTitle}
                onChangeText={(noticeTitle) => this.setState({noticeTitle})}
                placeholder={"Başlık..."}
                >
                </Input>
                <Input
                value={text}
                onChangeText={(text) => this.setState({text})}
                rightIcon={{type: 'font-awesome' , name: 'adn'}}
                
                placeholder={"Duyurunuzu giriniz ...?"}
                >
                    
                </Input>
                
                
                
            </View>
        )
    }
}

export default Admin

const style = StyleSheet.create({
   
  })