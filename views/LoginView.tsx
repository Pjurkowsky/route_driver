import ButtonMain from '@/components/ButtonMain';
import InputBox from '@/components/InputBox';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { Text, View, StyleSheet, Button, ImageBackground, TextInput, Image } from 'react-native';

const img = {uri: '../assets/images/RouteDriver.png'}


export default function LoginView() {
    const [login, onChangeText] = useState<string>();
    const [pass, onChangePass] = useState<string>();

    return (
        <View style={styles.container_sign_in}>
            <Image style={styles.image} source={img} />

            <InputBox onChangeText={onChangeText} title={login} placeholder='Login'/>
            <InputBox onChangeText={onChangePass} title={pass} placeholder='Password' password/>
            <ButtonMain onPress={() => {}} title="Log in"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container_sign_in: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    text_main: {
      fontWeight: 'bold',
      fontSize: 96,
      borderWidth: 1,
      borderRadius: 16,
      padding: 10,
      margin: 10,
      color: '#000',
    },
    text_main_prime: {
      fontSize: 96,
      color: Colors.Primary
    },
    button_main: {
        fontWeight: 'bold',
        color: Colors.Primary
    },
    image: {
        height: 300,
        width: 300,
    }
});