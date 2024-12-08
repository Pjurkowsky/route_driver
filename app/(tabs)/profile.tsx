import { Text, View, StyleSheet, Image, Alert } from "react-native";
import { Button } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { app, db, auth } from "@/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useGlobalContext } from "@/context/GlobalProvider";
import { signOut } from "firebase/auth";
import { router } from "expo-router";

export default function ProfileScreen() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const { user }: any = useGlobalContext();

  // const createRoute = async () => {
  //   try {
  //     const newRoute = {
  //       id: "route-003", // Generate a unique ID as needed
  //       name: "Sample Route 3",
  //       route: [
  //         {
  //           geolocation: { latitude: 53.4930107, longitude: 14.4684633 },
  //           street: "Wołczkowska",
  //           street_number: "",
  //         },
  //         {
  //           geolocation: { latitude: 53.4780671, longitude: 14.4842325 },
  //           street: "Jaworowa",
  //           street_number: "5",
  //         },
  //         {
  //           geolocation: { latitude: 53.4181842, longitude: 14.480441 },
  //           street: "Ogrodowa",
  //           street_number: "9a",
  //         },
  //         {
  //           geolocation: { latitude: 53.4217397, longitude: 14.4830276 },
  //           street: "Spiska",
  //           street_number: "18C",
  //         },
  //         {
  //           geolocation: { latitude: 53.4201667, longitude: 14.5369308 },
  //           street: "Bartosza Głowackiego",
  //           street_number: "15",
  //         },
  //         {
  //           geolocation: { latitude: 53.4269607, longitude: 14.5403179 },
  //           street: "Bolesława Krzywoustego",
  //           street_number: "15",
  //         },
  //         {
  //           geolocation: { latitude: 53.4324826, longitude: 14.547256 },
  //           street: "plac Grunwaldzki",
  //           street_number: "",
  //         },
  //         {
  //           geolocation: { latitude: 53.4039392, longitude: 14.6782728 },
  //           street: "Ekologiczna",
  //           street_number: "41",
  //         },
  //         {
  //           geolocation: { latitude: 53.4380303, longitude: 14.7407538 },
  //           street: "Leśna",
  //           street_number: "3",
  //         },
  //         {
  //           geolocation: { latitude: 53.3772135, longitude: 14.7369351 },
  //           street: "Strumykowa",
  //           street_number: "3",
  //         },
  //         {
  //           geolocation: { latitude: 53.3551707, longitude: 14.731333 },
  //           street: "Figowa",
  //           street_number: "15",
  //         },
  //         {
  //           geolocation: { latitude: 53.3754183, longitude: 14.6886865 },
  //           street: "Niedźwiedzia",
  //           street_number: "8",
  //         },
  //         {
  //           geolocation: { latitude: 53.3828179, longitude: 14.6599121 },
  //           street: "Łubinowa",
  //           street_number: "",
  //         },
  //         {
  //           geolocation: { latitude: 53.4955428, longitude: 14.5891159 },
  //           street: "Policka",
  //           street_number: "46",
  //         },
  //         {
  //           geolocation: { latitude: 53.4806153, longitude: 14.5867367 },
  //           street: "Na Wzgórzu",
  //           street_number: "7",
  //         },
  //         {
  //           geolocation: { latitude: 53.4452775, longitude: 14.554922 },
  //           street: "Świętych Cyryla i Metodego",
  //           street_number: "1",
  //         },
  //         {
  //           geolocation: { latitude: 53.4475126, longitude: 14.5478903 },
  //           street: "Mikołaja Reja",
  //           street_number: "3",
  //         },
  //         {
  //           geolocation: { latitude: 53.4360923, longitude: 14.5296 },
  //           street: "5 Lipca",
  //           street_number: "18",
  //         },
  //         {
  //           geolocation: { latitude: 53.4421687, longitude: 14.507215 },
  //           street: "Marii Konopnickiej",
  //           street_number: "1",
  //         },
  //         {
  //           geolocation: { latitude: 53.454532, longitude: 14.4958465 },
  //           street: "Tadeusza Zawadzkiego",
  //           street_number: "",
  //         },
  //         {
  //           geolocation: { latitude: 53.4930107, longitude: 14.4684633 },
  //           street: "Wołczkowska",
  //           street_number: "",
  //         },
  //       ],
  //       starting_at: Timestamp.fromDate(new Date()),
  //       kilometers: 10,
  //       status: "active",
  //       userId: "tst", // Replace with the logged-in user's ID if available
  //     };

  //     const docRef = await addDoc(collection(db, "routes"), newRoute);
  //     Alert.alert("Success", `Route created with ID: ${docRef.id}`);
  //   } catch (error) {
  //     console.error("Error adding route: ", error);
  //     Alert.alert("Error", "Failed to create route");
  //   }
  // };

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

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Upload new photo</Text>
      {user?.photoBlob && (
        <Image source={{ uri: user.photoBlob }} style={styles.image} />
      )}
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}
      <View style={{gap: 10}}>
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
        >
          Save
        </Button>
        <Button
          mode="contained"
          buttonColor="red"
          textColor="#fff"
          // onPress={() => createRoute()}
          onPress={() => {
            signOut(auth);
            router.replace("/");
          }}
          style={{ marginTop: 10 }}
        >
          Log out
        </Button>
      </View>
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
