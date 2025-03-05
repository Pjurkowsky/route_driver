import { Route, RoutesData } from "@/app/types/routes";
import { useRouter } from "expo-router";
import * as React from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { doc, updateDoc } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "@/firebaseConfig";

interface EndRouteDialogProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  routes: RoutesData;
}

const EndRouteDialog = ({
  visible,
  setVisible,
  routes,
}: EndRouteDialogProps) => {
  const router = useRouter();

  const handleContinue = async () => {
    setVisible(false);
    routes.status = "delivered";

    const routeDoc = doc(db, "routes", routes.id);
    await updateDoc(routeDoc, {
      ...routes,
    });
    router.push("/routes");
  };
  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Your route has ended</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={() => handleContinue()}>Continue</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default EndRouteDialog;
