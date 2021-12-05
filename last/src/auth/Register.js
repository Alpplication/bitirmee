import React, { Component } from 'react'
import { View,SafeAreaView, Button, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

import firebase from 'firebase'

export class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            email : '',
            password: '',
            name: '',
            hidePassword:true
        }
        this.onSignUp = this.onSignUp.bind(this)
    }
    // Kullanıcı kayıt ekranı, girilen bilgiler Firebase ekranına kayıt ediliyor.
    onSignUp(){
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            const user = firebase.auth().currentUser;
                user.updateProfile({
                    displayName:name,
                });
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <SafeAreaView style={{flex:1}}>
                <View style={{backgroundColor:'white',justifyContent:'center',flex:1,paddingVertical:50,alignItems:'center'}}>
                    <View style={{alignItems:'center'}}>
                        <Text style={style.hero}>Kullanıcı Girişi</Text>
                    </View>
                    <View style={style.form}>
                        <TextInput 
                            placeholder="Kullanıcı Adı"
                            onChangeText={(name) => this.setState({ name })}
                            placeholderTextColor={"#302D4C"}
                            style={style.input}
                        />
                        <TextInput 
                            placeholder="Email"
                            onChangeText={(email) => this.setState({ email })}
                            placeholderTextColor={"#302D4C"}
                            style={style.input}
                            keyboardType={"email-address"}
                        />
                        <View>
                            <TextInput 
                                placeholder="Şifre"
                                secureTextEntry={true}
                                onChangeText={(password) => this.setState({ password })}
                                placeholderTextColor={"#302D4C"}
                                style={style.input}
                                secureTextEntry={this.state.hidePassword}
                            />
                            <TouchableOpacity onPress={()=>this.setState({ hidePassword:!this.state.hidePassword})} style={{ position:'absolute',right:15,top:15}}>
                                <Icon name={(this.state.hidePassword) ? "eye-slash" : 'eye'} size={15} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.onSignUp()}
                            style={style.button}>
                            <Text style={style.button_text}>Kaydol</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

export default Register

const style = StyleSheet.create({
    hero: {color:'#1C1939',fontWeight:'600',fontSize:30},
    form:{flex:1,marginTop:80},
    input:{
        backgroundColor:'#F7F7F7',
        padding:15,
        width:300,
        height:50,
        borderRadius:10,
        paddingHorizontal:25,
        marginBottom:10
    },
    button:{
        backgroundColor:'#7165E3',
        padding:20,
        marginTop: 40,
        borderRadius:10,
        justifyContent: 'center',
        alignItems:'center'
    },
    button_text:{
        color:'white',
        fontWeight:'600',
        fontSize:18,
        textAlign:'center'
    }
})