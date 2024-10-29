import ButtonMain from '@/components/ButtonMain';
import InputBox from '@/components/InputBox';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';

const img = {uri: '../assets/images/RouteDriver.png'}

export default function CredentialsView() {
    const [page, setPage] = useState<string>('login');

    const isLogin = () => {
        return page === 'login';
    }

    const changePage = () => {
        setPage(isLogin() ? 'register' : 'login');
    }

    // Universal
    const [login, onChangeText] = useState<string>('');
    const [pass, onChangePass] = useState<string>('');

    // Register
    const [email, onChangeEmail] = useState<string>('');
    const [passRepeat, onChangePassRepeat] = useState<string>('');

    const checkLogin = () => {
        router.replace('/mainscreen');
    }

    return (
        <View style={styles.container_sign_in}>
            <Image style={styles.image} source={img} />
            <InputBox onChangeText={onChangeText} title={login} placeholder={isLogin() ? 'Login' : 'Username'} maxHeight={64}/>
            {!isLogin() && (<InputBox onChangeText={onChangeEmail} title={email} placeholder='E-mail' maxHeight={64} password/>)}
            <InputBox onChangeText={onChangePass} title={pass} placeholder='Password' maxHeight={64} password/>
            {!isLogin() && (<InputBox onChangeText={onChangePassRepeat} title={passRepeat} placeholder='Repeat password' maxHeight={64} password/>)}

            <ButtonMain title="Log in" onPress={checkLogin}/>
            {isLogin() ? (<Text style={{fontWeight: 'bold'}}>No account? <Text style={{color: Colors.Primary}} onPress={changePage}>Sign up here.</Text></Text>)
            : (<Text style={{fontWeight: 'bold'}}>Already have an account? <Text style={{color: Colors.Primary}} onPress={changePage}>Sign in.</Text></Text>)}
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
      gap: 16,
      paddingVertical: 128,
      paddingHorizontal: 256
    },
    image: {
        height: 300,
        width: 300,
    }
});