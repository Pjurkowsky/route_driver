import { Text, View, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { Avatar, Card, IconButton } from "react-native-paper";

const win = Dimensions.get("window");

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, margin: win.width * 0.025, gap: 8 }}>
        <Card style={{ backgroundColor: "#fff", alignContent: "center" }}>
          <Card.Title
            title="New route has been added!"
            left={(props) => <Avatar.Icon {...props} icon="bell" />}
            titleStyle={{ textAlign: "left", alignContent: "center" }}
            // style={{alignItems: "stretch"}}
            // leftStyle={{alignSelf: "center"}}
          />
        </Card>
        <Card style={{ backgroundColor: "#fff", alignContent: "center" }}>
          <Card.Title
            title="New route has been added!"
            left={(props) => <Avatar.Icon {...props} icon="bell" />}
            titleStyle={{ textAlign: "left", alignContent: "center" }}
          />
        </Card>
        <Card style={{ backgroundColor: "#fff", alignContent: "center" }}>
          <Card.Title
            title="New route has been added!"
            left={(props) => <Avatar.Icon {...props} icon="bell" />}
            titleStyle={{ textAlign: "left", alignContent: "center" }}
          />
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "stretch",
    gap: 8,
  },
  text: {
    color: "#000",
  },
});
