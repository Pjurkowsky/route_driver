import { Text, View, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { Avatar, Card, IconButton } from "react-native-paper";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { getAuth } from "firebase/auth";

const win = Dimensions.get("window");

export default function NotificationsScreen() {
  const auth = getAuth();

  const [notifications, setNotifications] = useState<
    { id: string; [key: string]: any }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "notifications"),
          where("recipientId", "==", auth?.currentUser?.uid.toString())
        );

        const querySnapshot = await getDocs(q);
        const notificationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          recipientId: null,
        }));
        setNotifications(notificationsData);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [auth]);

  // console.log(notifications);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, margin: win.width * 0.025, gap: 8 }}>
        {notifications.map((val) => (
          <Card
            key={val.id}
            style={{ backgroundColor: "#fff", alignContent: "center" }}
          >
            <Card.Title
              title={val.message}
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon={val.type === "info" ? "bell" : "exclamation-thick"}
                />
              )}
              titleStyle={{ textAlign: "left", alignContent: "center" }}
            />
          </Card>
        ))}
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
