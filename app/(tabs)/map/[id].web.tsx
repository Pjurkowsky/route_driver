import * as React from "react";
import { View, Text, StyleSheet, Platform} from "react-native";

export default function DynamicRouteScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dynamic Route Screen</Text>
      {Platform.OS === "web" && <Text> łebs</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    color: "#000",
  },
  map: {
    width: '100%',
    height: '100%',
  },
});