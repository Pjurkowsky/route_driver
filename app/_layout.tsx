import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false
    }} initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="mainscreen" />
    </Stack>
  );
}
