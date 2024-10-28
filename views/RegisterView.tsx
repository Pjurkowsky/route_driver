import { Text, View, StyleSheet, Button, ImageBackground, TextInput, Image } from 'react-native';

const img = {uri: '../assets/images/RouteDriver.png'}

export default function RegisterView() {
    return (
        <View style={styles.container_sign_in}>
            <Image style={styles.image} source={img}>

            </Image>
             <TextInput
              style={styles.text_main}
            //   onChangeText={onChangeText}
              value={"Username"}
            />
            <TextInput
              style={styles.text_main}
            //   onChangeText={onChangeText}
              value={"Email"}
            />
            <TextInput
              style={styles.text_main}
            //   onChangeText={onChangeText}
              value={"Password"}
            />
            <TextInput
              style={styles.text_main}
            //   onChangeText={onChangeText}
              value={"Repeat password"}
            />
            <Button
                // onPress={onPress}
                color="#00c9c7"
                title="Register"
                // accessibilityLabel="Learn more about this purple button"
                />
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
      color: '#00c9c7',
    },
    button_main: {
        fontWeight: 'bold',
        color: "#00c9c7"
    },
    image: {
        height: 300,
        width: 300,
    }
  });