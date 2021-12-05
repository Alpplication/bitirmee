import React, { Component, useState } from 'react'
import { View, Button, TextInput, Text, SafeAreaView, StyleSheet, TouchableOpacity , ScrollView, ImageBackground, Dimensions  } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'


import firebase from 'firebase'
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';




export class Login extends Component {
    constructor(){
        super();

        this.state = {
            email : '',
            password: '',
            hidePassword:true
            
        }
        this.onSignUp = this.onSignIn.bind(this)
    }
    // Kayıtlı kullanıcı icin Firebase e kaydedilen bilgiler ile giris yapma ekrani
    onSignIn(){
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    

    render() {
        
        return (
            <ScrollView
            style={{flex:1,backgroundColor: '#ffffff'}}
            showsVerticalScrollIndicator={false}>

                <ImageBackground
                source={require('../images/bckgrnd.jpg')}
                style={{height : Dimensions.get('window').height / 2.5,}}>
                
                <View style={styles.brandView}>
                    <Icon name="align-center" style={{color: '#ffffff' , fontSize: 80}} />
                    <Text style={styles.brandViewText}>HOCAM</Text>
                </View>
                
                
                </ImageBackground>

                <View style={styles.bottomView}>

                    <View style={{padding:40}}>
                    <Text style={{color: '#46321A' , fontSize: 32,}}>Hoşgeldiniz</Text>
                    <Text>Hala bir hesabınız yok mu?<Text onPress={() => this.props.navigation.navigate('Register')} style={{color:'orange',fontStyle:'italic'}}> {' '}Kayıt Olun</Text></Text>

                    <View style={{marginTop:50}}></View>
                    <View style={styles.form}>
                        <TextInput 
                            placeholder="Email"
                            onChangeText={(email) => this.setState({ email })}
                            style={styles.input}
                            placeholderTextColor={"#302D4C"}
                            keyboardType={"email-address"}
                        />
                        <View >
                            <TextInput 
                                placeholder="Şifre"
                                onChangeText={(password) => this.setState({ password })}
                                style={styles.input}
                                placeholderTextColor={"#302D4C"}
                                secureTextEntry={true}
                                secureTextEntry={this.state.hidePassword}
                            />
                            <TouchableOpacity onPress={()=>this.setState({hidePassword:!this.state.hidePassword})} style={{position:'absolute',right:15,top:15}}>
                                <Icon name={(this.state.hidePassword) ? "eye-slash" : "eye"} size={15} />
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>

                    <View style={{height:50 , justifyContent:'center' , alignItems:'center'}}>

                        <TouchableOpacity
                            onPress={() => this.onSignIn()}
                            style={styles.loginbtn}>
                            <Text style={styles.button_text}>Giriş Yap</Text>
                        </TouchableOpacity>
                        
                    </View>
                
                    <TouchableOpacity
                            onPress={() => isFromAdminAccount = true}
                            style={styles.loginbtn}>
                            <Text style={styles.button_text}>adminol</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => isFromAdminAccount = false}
                            style={styles.loginbtn}>
                            <Text style={styles.button_text}>adminck</Text>
                        </TouchableOpacity>

                        


                </View>

            </ScrollView>
        )
    }
}

export default Login

const styles = StyleSheet.create({
    
    brandView: {
        flex : 1,
        justifyContent : 'center',
        alignItems  : 'center',
    },

    brandViewText: {
        color : '#ffffff',
        fontSize : 40,
        fontWeight : 'bold',
        textTransform: 'uppercase',
    },

    bottomView: {
        flex : 1.5,
        backgroundColor : '#ffffff',
        bottom:50,
        borderTopStartRadius:60,
        borderTopEndRadius:60,
        
    },

    

    loginbtn: {
        alignSelf: 'center',
        backgroundColor: '#4632A1',
        width:Dimensions.get('window').width/2 ,
        justifyContent: 'center',
        backgroundColor:'orange',
        padding:15,
        
        borderRadius:10,
        justifyContent: 'center',
        alignItems:'center'
    },


    input:{
        backgroundColor:'#F7F7F7',
        padding:15,
        width:300,
        height:50,
        borderRadius:10,
        paddingHorizontal:25,
        marginBottom:10
    },

    buttonContainer: {
        height : 50,
        marginTop : 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        
      },
    button:{
        backgroundColor:'orange',
        padding:15,
        
        borderRadius:10,
        justifyContent: 'center',
        alignItems:'center'
    },
    button_text:{
        
        color:'black',
        fontWeight:'500',
        fontSize:15,
        textAlign:'center'
    },
    error:{
        color:'red'
    }
})