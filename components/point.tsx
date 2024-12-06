import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Button, Modal, Portal } from "react-native-paper";
import { Item, Route, RoutesData } from "@/app/types/routes";
import React from "react";
interface PointModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  pointData: Route;
}
import { TextInput } from "react-native-paper";
import { Linking } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const PointModal = ({ visible, setVisible, pointData }: PointModalProps) => {
  return (
    <View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => {
            setVisible(false);
          }}
          contentContainerStyle={containerStyle}
          style={styles.containerStyle}
        >
          <View style={styles.content}>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.text}>
                {pointData.street} {pointData.street_number}
              </Text>
              <Text style={styles.label}>Phone:</Text>

              <View style={styles.phoneContainer}>
                <MaterialIcons name="phone" size={24} color="black" />
                <Button
                  mode="contained"
                  onPress={() =>
                    Linking.openURL(`tel:${pointData.phone_number}`)
                  }
                  style={styles.button}
                >
                  {pointData.phone_number}
                </Button>
              </View>
              <Text style={styles.label}>Description:</Text>
              <TextInput
                mode="outlined"
                value={pointData.description}
                style={styles.textField}
                disabled
              />
              <Text style={styles.label}>Order:</Text>
              <Text style={styles.text}>
                {pointData.order.product_name} -{" "}
                {pointData.order.price * pointData.order.quantity} PLN
              </Text>
              <Text style={styles.label}>Quantity:</Text>
              <Text style={styles.text}>{pointData.order.quantity}</Text>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerStyle: {
    backgroundColor: "#FFFA",
    paddingVertical: 100,
    paddingHorizontal: 32,
    borderRadius: 10,
    flex: 1,
    flexDirection: "column",
  },
  content: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
  },
  infoContainer: {
    gap: 4,
  },
  label: {
    fontWeight: "bold",
  },
  text: {
    marginBottom: 8,
  },
  button: {
    marginBottom: 8,
  },
  textField: {
    marginBottom: 8,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
});
const containerStyle = {
  backgroundColor: "white",
  padding: 20,
  innerWidth: "80%",
  borderRadius: 10,
  flex: 1,
};

export default PointModal;
