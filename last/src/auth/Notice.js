// import React from "react";
// import { View, Text, StyleSheet} from 'react-native';

// import firebase from 'firebase'
// import "firebase/database"


// const Notice = ({item}) => {

//     // Firebase den cekilen veri buradaki view ve text ler ile ekrana yazdırılıyor.
//     return <View style={style. container}>
//                 <Text numberOfLines={2} style={style.bubble}>{item.text}</Text>
//             </View>
// }

// const style = StyleSheet.create({
//     container:{
       
//         backgroundColor:'orange',
        
//     },
//     viewStyle:{
//         marginBottom : 2,
//         flexDirection:'row',
//         flex:1,
//         justifyContent:'flex-start'
//     }
// })



import React from "react";
import { View, Text, StyleSheet , Dimensions} from 'react-native';

import firebase from 'firebase'
import "firebase/database"
import { TouchableOpacity } from "react-native-gesture-handler";


const Notice = ({item , onPress}) => {

    // Firebase den cekilen veri buradaki view ve text ler ile ekrana yazdırılıyor.
    return <TouchableOpacity 

     style={style.viewStyle}>
                <Text numberOfLines={2} style={style.bubble}>{item.text}</Text>
            </TouchableOpacity>
}

const width = Dimensions.get('window').width - 40;

const style = StyleSheet.create({
   //TExt
    bubble:{
        marginBottom:10,
        backgroundColor:'orange',
        borderRadius:10,
        padding:15,
        flex: 1,
        height:50,
        paddingHorizontal:25,
        fontWeight:'bold',
        fontSize : 16,
        color : 'white',
    },
    viewStyle:{
        marginBottom : 2,
        flexDirection:'row',
        flex:1,
        justifyContent:'flex-start',
        width: width/2 - 10,
        padding: 8,
        borderRadius:10,
    }
})

export default Notice;