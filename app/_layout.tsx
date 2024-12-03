import React from "react";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
  useTheme,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import GlobalProvider, { useGlobalContext } from "../context/GlobalProvider";
import { Stack } from "expo-router";
import { StyleSheet, StatusBar, Image, View, Text } from "react-native";
import { Colors } from "@/constants/Colors";

const img = "../assets/images/RouteDriver.png";

const RootLayout = () => {
  return (
    <GlobalProvider>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: "#fff",
              },
              headerTitleAlign: "center",
            }}
          >
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen name="(tabs)" options={{ header: Header, headerRight: () => <Button onPress={() => {}}> a </Button>}}/> */}
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaProvider>
      </PaperProvider>
    </GlobalProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
  },
});

const theme = {
  ...DefaultTheme,
  // Specify custom property
  roundness: 4,
  borderWidth: 1,
  table: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 4,
  },
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.Primary,
    textPrimary: "#000",
    secondary: Colors.Secondary,
    textSecondary: "#FFF",
    background: "#FFF",
  },
};

export type AppTheme = typeof theme;

export const useAppTheme = () => useTheme<AppTheme>();
