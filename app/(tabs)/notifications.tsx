import { Text, View, StyleSheet } from "react-native";
import { Avatar, Card, IconButton } from "react-native-paper";

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
  <Card style={{backgroundColor:"#fff", marginTop:10}}>
        <Card.Title
          title="New route has been added!"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
        />
      </Card>
      <Card style={{backgroundColor:"#fff", marginTop:10}}>
        <Card.Title
          title="New route has been added!"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
        />
      </Card>
      <Card style={{backgroundColor:"#fff",  marginTop:10}}>
        <Card.Title
          title="New route has been added!"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    color: "#000",
  },
});
