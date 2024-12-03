import { useGlobalContext } from "../context/GlobalProvider";
import { StyleSheet, StatusBar, Image, View, Text } from "react-native";

const img = "../assets/images/RouteDriver.png";

export const HeaderRight = () => {
    const { user }: any = useGlobalContext();
  
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row-reverse",
          alignItems: "center",
          alignSelf: "stretch",
          gap: 10,
        }}
      >
        {user?.photoBlob ? (
          <Image source={{ uri: user?.photoBlob }} style={styles.image} />
        ) : (
          <Image style={styles.image} source={require(img)} />
        )}
        <Text style={{ textAlign: "right" }}>{user?.name || "Anonymous"}</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    image: {
      height: 100,
      width: 100,
    },
  });