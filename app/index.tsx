import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { Text, StyleSheet, ImageBackground, Image, View, Dimensions } from "react-native";
import { Button } from "react-native-paper";

const img = { uri: "../assets/images/RouteDriver.png" };
const win = Dimensions.get('window');

export default function WelcomeView() {
  return (
    <View style={styles.container_welcome}>
      <Image
        source={img}
        resizeMode="cover"
        style={
          {
            height: win.height * 0.5,
            width: win.width * 0.25
          }
        }
      />
        <Text>
          <Text style={styles.text_main}>Your </Text>
          <Text style={styles.text_main_prime}>Routes</Text>
          <Text style={styles.text_main}>, Your</Text>
          <Text style={styles.text_main_prime}> Way</Text>
          <Text style={styles.text_main}>!</Text>
        </Text>
        <Button
          mode="contained"
          buttonColor={Colors.Primary}
          textColor="#fff"
          onPress={() => router.push("/sign-in")}
          labelStyle={{ fontWeight: "bold" }}
        >
          Get started now!
        </Button>
      </View>
  );
}

const styles = StyleSheet.create({
  container_welcome: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  text_main: {
    fontSize: 96,
    color: "#FFF",
  },
  text_main_prime: {
    fontSize: 96,
    color: Colors.Primary,
  },
});
