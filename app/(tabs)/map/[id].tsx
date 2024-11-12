import * as React from "react";
import { View, StyleSheet} from "react-native";
import MapView from "react-native-maps/lib/MapView";

export default function DynamicRouteScreen() {
  return (
    <View style={styles.container}>

      <MapView  
      style={styles.map} showsUserLocation
      showsMyLocationButton/>
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
    flex: 1,
    width: '100%',
    height: '100%',
  },
});