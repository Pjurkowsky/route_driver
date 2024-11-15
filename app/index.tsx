import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { SafeAreaView, Text, StyleSheet, ImageBackground, Image, View, Dimensions } from "react-native";
import { Button } from "react-native-paper";

const img = "../assets/images/RouteDriver.png";
const win = Dimensions.get('window');

export default function WelcomeView() {
  return (
    <SafeAreaView style={styles.container_welcome}>
      <View style={{flex: 1, margin: win.width * 0.025, gap: 8}}>
      <Image
        source={require(img)}
        resizeMode="cover"
        style={
          {
            flex: 1,
            height: win.height * 0.25,
            margin: 32,
            // height: 100,
            alignSelf: "center"
            // width: win.width * 0.5,
          }
        }
      />
        <Text style={{flex: 1, alignItems: "center", alignContent: "center", textAlign: "center"}}>
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
          labelStyle={{ fontWeight: "bold", flex: 1, alignSelf: "stretch" }}
        >
          Get started now!
        </Button>
      </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container_welcome: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  text_main: {
    fontSize: 96,
    color: "#FFF",
    textShadowColor: Colors.Primary,
    textShadowRadius: 4,
  },
  text_main_prime: {
    fontSize: 96,
    color: Colors.Primary,
  },
});
