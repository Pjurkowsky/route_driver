import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  View,
  Dimensions,
} from "react-native";
import { Button } from "react-native-paper";

const logo = "../assets/images/RouteDriver.png";
const homeScreen = "../assets/images/image.png";
const win = Dimensions.get("window");

export default function WelcomeView() {
  return (
    <SafeAreaView style={styles.container_welcome}>
      <ImageBackground
        source={require(homeScreen)}
        style={styles.background}
        resizeMode="cover"
        imageStyle={{ opacity: 0.5 }}
      >
        <View style={styles.content}>
          <Image
            source={require(logo)}
            resizeMode="cover"
            style={styles.logo}
          />
          <Text style={styles.text_container}>
            {["Your ", "Routes", ", Your", " Way", "!"].map((val, index) => (
              <Text
                key={val}
                style={index % 2 ? styles.text_main_prime : styles.text_main}
              >
                {val}
              </Text>
            ))}
          </Text>
          <Button
            mode="contained"
            buttonColor={Colors.Primary}
            textColor="#fff"
            onPress={() => router.push("/sign-in")}
            labelStyle={{ fontWeight: "bold" }}
            style={styles.button}
          >
            Get started now!
          </Button>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container_welcome: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: win.width * 0.6,
    height: win.height * 0.25,
    marginBottom: 20,
  },
  text_container: {
    textAlign: "center",
    marginVertical: 20,
  },
  text_main: {
    fontSize: 40,
    color: "#FFF",
    fontWeight: "700",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  text_main_prime: {
    fontSize: 40,
    fontWeight: "700",
    color: Colors.Primary,
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  button: {
    marginTop: 30,
  },
});
