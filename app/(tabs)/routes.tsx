import React from "react";
import { SafeAreaView, StyleSheet, View, Dimensions } from "react-native";
import { DataTable, Searchbar, ActivityIndicator } from "react-native-paper";
import { router, useNavigation } from "expo-router";
import { useAppTheme } from "@/app/_layout";
import { and, collection, getDocs, or, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db, auth } from "@/firebaseConfig";
const win = Dimensions.get("window");

export default function RoutesScreen() {
  const theme = useAppTheme();
  // const auth = getAuth();

  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([5, 6, 7]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );
  const [searchQuery, setSearchQuery] = React.useState("");

  const [routes, setRoutes] = React.useState<
    { id: string; [key: string]: any }[]
  >([]);
  const [loading, setLoading] = React.useState(true);

  const filteredRoutes = searchQuery
    ? routes.filter(
        ({ name, starting_at, route, kilometers }) =>
          !!name.includes(searchQuery) ||
          starting_at.toString().includes(searchQuery) ||
          route.length.toString().includes(searchQuery) ||
          kilometers.toString().includes(searchQuery)
      )
    : routes;

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, routes.length);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "routes"),
          where("userId", "==", auth?.currentUser?.uid.toString())
        );

        const querySnapshot = await getDocs(q);
        const routesData = querySnapshot.docs
          .filter((doc) => doc.data().status != "delivered")
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
            userId: null,
          }));
        setRoutes(routesData);
      } catch (error) {
        console.error("Error fetching routes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [auth]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  function toDateTime(secs: number) {
    var t = new Date(Date.UTC(1970, 0, 1)); // Epoch
    t.setUTCSeconds(secs);
    return (
      t.toLocaleDateString(undefined) + " " + t.toLocaleTimeString(undefined)
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, margin: win.width * 0.025, gap: 8 }}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <DataTable style={{ ...theme.table, flex: 1 }}>
          <DataTable.Header>
            <DataTable.Title style={{ flex: 1 }}>Name</DataTable.Title>
            <DataTable.Title
              numeric
              style={{ flex: 2, justifyContent: "center" }}
            >
              Starting at
            </DataTable.Title>
            <DataTable.Title numeric style={{ flex: 1 }}>
              Stops
            </DataTable.Title>
            <DataTable.Title numeric style={{ flex: 1 }}>
              Kilometers
            </DataTable.Title>
          </DataTable.Header>

          {filteredRoutes.slice(from, to).map((item) => (
            <DataTable.Row
              onPress={() => {
                router.push(`/map/${item.id}`);
              }}
              key={item.id}
            >
              <DataTable.Cell style={{ flex: 1 }}>{item.name}</DataTable.Cell>
              <DataTable.Cell numeric style={{ flex: 2 }}>
                {toDateTime(item.starting_at.seconds)}
              </DataTable.Cell>
              <DataTable.Cell numeric style={{ flex: 1 }}>
                {item.route.length}
              </DataTable.Cell>
              <DataTable.Cell numeric style={{ flex: 1 }}>
                {item.kilometers} km
              </DataTable.Cell>
            </DataTable.Row>
          ))}
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(filteredRoutes.length / itemsPerPage)}
            onPageChange={setPage}
            label={`${from + 1}-${to} of ${filteredRoutes.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={"Rows per page"}
          />
        </DataTable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  data_table: {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
  },
  data_table_text: {
    color: "#000",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
