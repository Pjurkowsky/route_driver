import ButtonMain from '@/components/ButtonMain';
import { Colors } from '@/constants/Colors';
import { Text, StyleSheet, ImageBackground } from 'react-native';

const img = {uri: '../assets/images/RouteDriver.png'}

type props = {
    onPress: () => void
}

export default function WelcomeView({onPress} : props) {
    return (
        <ImageBackground source={img} resizeMode="cover" style={styles.container_welcome}>
            <Text>
                <Text style={styles.text_main}>Your </Text>
                <Text style={styles.text_main_prime}>Routes</Text>
                <Text style={styles.text_main}>, Your</Text> 
                <Text style={styles.text_main_prime}> Way</Text>
                <Text style={styles.text_main}>!</Text>
            </Text>
            <ButtonMain onPress={onPress} title="Get started now!"/>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container_welcome: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ddd',
    },
    text_main: {
      fontSize: 96,
      color: '#FFF',
    },
    text_main_prime: {
      fontSize: 96,
      color: Colors.Primary,
    },
});