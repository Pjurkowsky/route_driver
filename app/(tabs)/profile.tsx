import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
// import * as ImagePicker from 'expo-image-picker';
// import {Image} from "expo-image";

export default function ProfileScreen() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  // const pickImageAsync = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ['images'],
  //     allowsEditing: true,
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setSelectedImage(result.assets[0].uri);
  //   } else {
  //     alert('You did not select any image.');
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Upload new photo</Text>
      {/* {selectedImage && (
        <View style={{flex: 1}}>
      <Image source={selectedImage} style={styles.image} />
      </View>)
      } */}
      <Button
        mode="contained"
        buttonColor={Colors.Primary}
        textColor="#fff"
        onPress={() => {}}
        // onPress={pickImageAsync}
      >
        {" "}
        Save
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#000",
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
