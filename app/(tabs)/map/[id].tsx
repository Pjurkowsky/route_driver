import * as React from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "@/firebaseConfig";
import { useLocalSearchParams } from "expo-router/build/hooks";
import MapViewDirections from "react-native-maps-directions";
import * as Linking from "expo-linking";
import { Button, Card, IconButton, Text } from "react-native-paper";
import { getAuth } from "firebase/auth";
import { useFocusEffect } from "expo-router";
import { Coordinates, Route, RoutesData } from "@/app/types/routes";
import MapList from "@/components/maplist";
import PointModal from "@/components/point";
import SkipDialog from "@/components/skipDialog";
import EndRouteDialog from "@/components/endRouteDialog";

export default function DynamicRouteScreen() {
  const { id } = useLocalSearchParams();
  // const auth = getAuth();
  const mapRef = React.useRef<MapView>(null);

  const [routesData, setRoutesData] = React.useState<RoutesData>();
  const origin = React.useMemo(
    () => routesData?.route[0].geolocation,
    [routesData]
  );
  const [destination, setDestination] = React.useState<Route>();
  const zoomToInitialRegion = React.useCallback(() => {
    if (origin && mapRef.current) {
      console.log(origin);
      mapRef.current.animateToRegion({
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  }, [origin]);

  React.useEffect(() => {
    if (routesData) {
      zoomToInitialRegion();
    }
  }, [routesData, zoomToInitialRegion]);

  const handleContinue = () => {
    console.log(destination);
    if (routesData) {
      const nextIndex =
        routesData.route.findIndex(
          (point) => point.geolocation === destination?.geolocation
        ) + 1;
      if (nextIndex < routesData.route.length) {
        setDestination(routesData.route[nextIndex]);
      } else {
        setEndRouteDialogVisibility(true);
      }
    }
  };

  const [start, setStart] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [isMapListVisible, setMapListVisibility] = React.useState(false);
  const [isPointModalVisible, setPointModalVisibility] = React.useState(false);
  const [isSkipDialogVisible, setSkipDialogVisibility] = React.useState(false);
  const [isEndRouteDialogVisible, setEndRouteDialogVisibility] =
    React.useState(false);

  const [pointClicked, setPointClicked] = React.useState<Route>();

  const handleStart = () => {
    setDestination(routesData?.route[0]);
    setStart(true);
  };
  const handleCancel = () => {
    routesData?.route.forEach((point) => {
      point.skip = false;
    });
    setDestination(undefined);
    setStart(false);
  };

  const handleSkip = () => {
    setSkipDialogVisibility(true);
  };

  const handleMarkerClick = (point: Route) => {
    setPointClicked(point);
    setPointModalVisibility(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const q = query(
            collection(db, "routes"),
            where("userId", "==", auth?.currentUser?.uid.toString())
          );

          const querySnapshot = await getDocs(q);
          console.log(id);

          const routesData = querySnapshot.docs.find((doc) => doc.id === id);

          if (routesData) {
            setRoutesData({
              id: routesData.id,
              name: routesData.data().name,
              route: routesData.data().route,
              starting_at: routesData.data().starting_at,
              kilometers: routesData.data().kilometers,
            });
            setDestination(routesData.data().route[0]);
          }
        } catch (error) {
          console.error("Error fetching routes:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [id, auth])
  );
  const openGoogleMaps = () => {
    if (!routesData) return;

    if (origin && destination) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${destination.geolocation.latitude},${destination.geolocation.longitude}`;
      Linking.openURL(url).catch((err) =>
        console.error("Error opening Google Maps", err)
      );
    } else {
      console.error("Origin or destination is undefined");
    }
  };

  const currentIndex = routesData?.route.findIndex((val, index) => 
    (val.geolocation.latitude === destination?.geolocation.latitude) && (val.geolocation.longitude === destination?.geolocation.longitude)) ?? 0;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={mapRef}
        initialRegion={{
          latitude: origin?.latitude ?? 0,
          longitude: origin?.longitude ?? 0,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {routesData &&
          routesData.route.map((route, index) => {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: route.geolocation.latitude,
                  longitude: route.geolocation.longitude,
                }}
                title={`Point ${index + 1}`}
                description={`Lat: ${route.geolocation.latitude}, Lon: ${route.geolocation.longitude}`}
                onPress={() => {
                  handleMarkerClick(route);
                }}
              >
                <View
                  style={[
                    styles.customMarker,
                    route.geolocation === destination?.geolocation && {
                      backgroundColor: "red",
                    },
                    index < currentIndex && {
                      backgroundColor: "grey"
                    },
                    route.skip && {
                      backgroundColor: "yellow",
                    },
                  ]}
                >
                  <Text style={styles.markerText}>{index}</Text>
                </View>
              </Marker>
            );
          })}
        {routesData && routesData.route.length > 0 && (
          <MapViewDirections
            strokeWidth={3}
            strokeColor={"#00c9c7"}
            origin={routesData.route[0].geolocation}
            waypoints={routesData.route
              .slice(1, -1)
              .map((point) => point.geolocation)}
            destination={
              routesData.route[routesData.route.length - 1].geolocation
            }
            apikey={"dlapanato"}
          />
        )}
      </MapView>
      {start && (
        <IconButton
          style={styles.floatingButton}
          iconColor="white"
          size={36}
          icon="directions"
          onPress={openGoogleMaps}
        />
      )}
      <Card mode="elevated">
        {start && (
          <Card.Title
            title="Next Stop"
            subtitle={`${destination?.street} ${destination?.street_number}`}
          />
        )}
        <Card.Actions style={styles.cardActions}>
          {start && (
            <View style={styles.buttons}>
              <Button onPress={handleCancel}>Cancel</Button>
              <Button onPress={handleSkip}>Skip</Button>
              <Button onPress={handleContinue}>Continue</Button>
            </View>
          )}
          {!start && (
            <View style={styles.buttons}>
              <Button onPress={() => setMapListVisibility(true)}>
                View Stops
              </Button>
              <Button onPress={handleStart}>Start</Button>
            </View>
          )}
        </Card.Actions>
      </Card>

      {routesData && (
        <>
          <MapList
            visible={isMapListVisible}
            setVisible={setMapListVisibility}
            routesData={routesData}
            setRoutesData={setRoutesData}
          />
          {pointClicked && (
            <PointModal
              visible={isPointModalVisible}
              setVisible={setPointModalVisibility}
              pointData={pointClicked}
            />
          )}
          {destination && (
            <SkipDialog
              visible={isSkipDialogVisible}
              setVisible={setSkipDialogVisibility}
              continueFunction={handleContinue}
              pointData={destination}
            />
          )}
          <EndRouteDialog
            visible={isEndRouteDialogVisible}
            setVisible={setEndRouteDialogVisibility}
          ></EndRouteDialog>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    color: "#000",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  customMarker: {
    marginTop: 10,
    marginLeft: 8,
    backgroundColor: "#00C0C7",
    padding: 5,
    borderRadius: 15,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 30
  },
  markerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  floatingButton: {
    position: "absolute",
    bottom: 130,
    right: 10,
    backgroundColor: "#0c6ccc",
  },
  cardActions: {
    borderRadius: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});
