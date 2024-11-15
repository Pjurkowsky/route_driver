import { Colors } from "@/constants/Colors";
import { useState } from "react";
import {  View, StyleSheet, Image } from "react-native";
import { Dimensions } from "react-native";
import { router } from "expo-router";
import { Button, TextInput } from "react-native-paper";

const img = "@/assets/images/RouteDriver.png";
const win = Dimensions.get("window");

export default function CredentialsView() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container_sign_in}>
      <Image style={styles.image} source={require(img)} />
      <TextInput
        label="Login"
        value={login}
        onChangeText={(text) => setLogin(text)}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        mode="contained"
        buttonColor={Colors.Primary}
        textColor="#fff"
        onPress={() => router.push("/routes")}
      >
        Log in
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container_sign_in: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    gap: 16,
    paddingVertical: win.height / 7.5,
    paddingHorizontal: win.width / 7.5,
  },
  image: {
    height: 300,
    width: 300,
  },
});
