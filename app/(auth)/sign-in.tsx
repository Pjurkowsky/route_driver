import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Alert,
  ImageBackground,
  SafeAreaView,
  Platform,
} from "react-native";
import { Dimensions } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app, db } from "@/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useGlobalContext } from "@/context/GlobalProvider";

const logo = "../../assets/images/RouteDriver.png";
const win = Dimensions.get("window");
const homeScreen = "../../assets/images/image.png";

export default function CredentialsView() {
  const [email, setEmail] = useState("dzepetto@gmail.com");
  const [password, setPassword] = useState("lubieplacki123");

  const { setUser, setIsLogged } = useGlobalContext();

  const handleLogin = async (
    email: string,
    password: string,
    setUser: (user: any) => void,
    setIsLogged: (isLogged: boolean) => void
  ) => {
    const auth = getAuth(app);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed in:");

      const userRef = doc(db, "users", user.uid);

      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          email: user.email,
          createdAt: new Date().toISOString(),
        });
      } else {
        await setDoc(
          userRef,
          {
            email: user.email,
          },
          { merge: true }
        );
      }

      setUser({
        email: user.email,
        uid: user.uid,
      });
      setIsLogged(true);

      router.push("/routes");
    } catch (error) {
      console.error("Error signing in:", (error as Error).message);
      Alert.alert("Login Failed", (error as Error).message);
    }
  };

  return (
    <>
      <ImageBackground
        source={require(homeScreen)}
        style={styles.background}
        resizeMode="cover"
        imageStyle={{ opacity: 0.5 }}
      >
        <SafeAreaView style={styles.container_sign_in}>
          <View style={styles.container_inner}>
            <Image
              style={Platform.OS === "web" ? styles.logo_web : styles.logo}
              source={require(logo)}
            />
            <TextInput
              label="E-mail"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{ width: "100%" }}
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              autoCapitalize="none"
              style={{ width: "100%" }}
            />
            <Button
              mode="contained"
              buttonColor={Colors.Primary}
              textColor="#fff"
              onPress={() => handleLogin(email, password, setUser, setIsLogged)}
              style={{ width: "100%" }}
            >
              Log in
            </Button>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container_sign_in: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "auto",
    width: "100%",
    height: "100%",
  },
  container_inner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    width: "80%",
  },
  logo: {
    width: win.width * 0.6,
    height: win.height * 0.25,
    marginBottom: 20,
  },
  logo_web: {
    width: win.width * 0.25,
    height: win.height * 0.4,
    marginBottom: 20,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container_welcome: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});
