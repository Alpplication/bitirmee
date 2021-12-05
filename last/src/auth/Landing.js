import React from 'react'
import { Text, View, Button } from 'react-native'

export default function Landing({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Button
                title="Giriş Yap"
                onPress={() => navigation.navigate("Login")} />
            <Button
                title="Kayıt Ol"
                onPress={() => navigation.navigate("Register")} />
        </View>
    )
}
