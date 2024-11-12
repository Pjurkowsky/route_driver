import React from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import GlobalProvider from "../context/GlobalProvider";
import { Stack } from "expo-router";
import { Image, View } from "react-native";
import { StyleSheet } from "react-native";

const img = { uri: "../assets/images/RouteDriver.png" };

const RootLayout = () => {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <GlobalProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ header: () => <Image style={styles.image} source={img}/>}}/>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>
        </GlobalProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({

  image: {
    height: 100,
    width: 100,
  },

});
