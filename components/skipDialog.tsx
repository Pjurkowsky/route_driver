import { Route } from "@/app/types/routes";
import * as React from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface SkipDialogProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  pointData: Route;
  continueFunction: () => void;
}

const SkipDialog = ({
  visible,
  setVisible,
  pointData,
  continueFunction,
}: SkipDialogProps) => {
  const handleSkip = () => {
    if (pointData) {
      pointData.skip = true;
    }
    continueFunction();
    setVisible(false);
  };

  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>
            Do you want to skip {pointData.street} {pointData.street_number}?
          </Dialog.Title>
          {/* <Dialog.Content>
            <Text variant="bodyMedium">
              Do you want to skip {pointData.street} {pointData.street_number}
            </Text>
          </Dialog.Content> */}
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button onPress={() => handleSkip()}>Skip</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default SkipDialog;
