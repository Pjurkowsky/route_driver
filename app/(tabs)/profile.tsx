import { Text, View, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app, db } from "@/firebaseConfig";
import { getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function ProfileScreen() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const { user }: any = useGlobalContext();

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const uploadUserProfileImage = async (imageURI: string) => {
    if (user) {
      try {
        const response = await fetch(imageURI);
        const blob = await response.blob();

        const base64Data = await new Promise<string | null>(
          (resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = () => reject(null);
            reader.readAsDataURL(blob);
          }
        );

        if (!base64Data) {
          throw new Error("Failed to convert image to Base64.");
        }

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { photoBlob: base64Data });

        console.log("Profile image saved as Base64 in Firestore.");
      } catch (error) {
        console.error("Error uploading profile image:", error);
      }
    } else {
      alert("User not logged in.");
    }
  };

  console.log(user);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Upload new photo</Text>
      {user?.photoBlob && (
        <Image source={{ uri: user.photoBlob }} style={styles.image} />
      )}
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}
      <Button
        mode="contained"
        buttonColor={Colors.Primary}
        textColor="#fff"
        onPress={pickImageAsync}
      >
        Select Image
      </Button>
      <Button
        mode="contained"
        buttonColor={Colors.Primary}
        textColor="#fff"
        onPress={() => uploadUserProfileImage(selectedImage!)}
        style={{ marginTop: 10 }}
      >
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
    marginBottom: 20,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
    marginBottom: 20,
  },
});
