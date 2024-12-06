import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Button, Modal, Portal } from "react-native-paper";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { Item, RoutesData } from "@/app/types/routes";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Routes } from "expo-router";
interface MapListProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  routesData: RoutesData;
  setRoutesData: (data: RoutesData) => void;
}

const MapList = ({
  visible,
  setVisible,
  routesData,
  setRoutesData,
}: MapListProps) => {
  const [listItemRoutesData, setlistItemRoutesData] = React.useState<Item[]>();

  React.useEffect(() => {
    const listData = routesData?.route?.map(
      ({ street, street_number }, index) => {
        return {
          id: index.toString(),
          name: `${street} ${street_number}`,
        };
      }
    );
    setlistItemRoutesData(listData);
  }, []);

  const handleSave = () => {
    console.log(listItemRoutesData);
    if (listItemRoutesData) {
      const updatedRoutes = listItemRoutesData.map((item, index) => ({
        ...routesData.route[Number(item.id)],
      }));

      setRoutesData({
        ...routesData,
        route: updatedRoutes,
      });
      setVisible(false);
    }
  };

  const List = gestureHandlerRootHOC(() => {
    if (listItemRoutesData) {
      return (
        <View>
          <DraggableFlatList
            data={listItemRoutesData}
            renderItem={renderItem}
            keyExtractor={(item, index) => `draggable-item-${item.id}`}
            onDragEnd={({ data }) => {
              console.log(data);
              setlistItemRoutesData(data);
            }}
          />
        </View>
      );
    }
  });

  const renderItem = React.useCallback(
    ({ item, getIndex, drag, isActive }: RenderItemParams<Item>) => {
      return (
        <ScaleDecorator>
          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: "white",
              borderColor: Colors.PrimaryLight,
              borderRadius: 20,
              borderWidth: 2,
              marginVertical: 4,
            }}
            onLongPress={drag}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: Colors.Primary,
                fontSize: 32,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        </ScaleDecorator>
      );
    },
    []
  );

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
          <View
            style={{ flex: 1, flexDirection: "column", alignContent: "center" }}
          >
            <List />

            <View style={{ gap: 4 }}>
              <Button mode="contained" onPress={handleSave}>
                Save
              </Button>
              <Button
                mode="contained"
                onPress={() => {
                  setVisible(false);
                }}
              >
                Close
              </Button>
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
});
const containerStyle = {
  backgroundColor: "white",
  padding: 20,
  innerWidth: "80%",
  borderRadius: 10,
  flex: 1,
};

export default MapList;
