import { Route } from "@/app/types/routes";
import { useRouter } from "expo-router";
import * as React from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface EndRouteDialogProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const EndRouteDialog = ({ visible, setVisible }: EndRouteDialogProps) => {
  const router = useRouter();

  const handleContinue = () => {
    setVisible(false);

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
