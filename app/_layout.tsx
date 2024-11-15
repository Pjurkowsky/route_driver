import React from "react";
import { PaperProvider,
  MD3LightTheme as DefaultTheme,
  useTheme
 } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import GlobalProvider from "../context/GlobalProvider";
import { Stack } from "expo-router";
import { StyleSheet, StatusBar } from "react-native";
import { Colors } from "@/constants/Colors";
import Header from "@/components/header";

const RootLayout = () => {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <GlobalProvider>
          <Stack screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
          },
          headerTitleAlign: "center"}}>
            <Stack.Screen name="(tabs)" options={{ header: Header}}/>
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

const theme = {
  ...DefaultTheme,
  // Specify custom property
  roundness: 4,
  borderWidth: 1,
  table: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4
  },
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.Primary,
    textPrimary: '#000',
    secondary: Colors.Secondary,
    textSecondary: '#FFF',
    background: "#FFF"
  },
};

export type AppTheme = typeof theme;

export const useAppTheme = () => useTheme<AppTheme>();