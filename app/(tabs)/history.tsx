import React from "react";
import { SafeAreaView, Text, View, StyleSheet, Dimensions } from "react-native";
import { Searchbar, DataTable } from "react-native-paper";
import { router } from "expo-router";
import { useAppTheme } from "@/app/_layout";

const win = Dimensions.get("window");

export default function HistoryScreen() {
  const theme = useAppTheme();
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const [searchQuery, setSearchQuery] = React.useState("");

  const [items] = React.useState([
    {
      key: 1,
      name: "Cupcake",
      calories: 356,
      fat: 16,
    },
    {
      key: 2,
      name: "Eclair",
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: "Frozen yogurt",
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: "Gingerbread",
      calories: 305,
      fat: 3.7,
    },
  ]);

  const filteredItems = searchQuery
    ? items.filter(
        ({ name, calories, fat }) =>
          !!name.includes(searchQuery) ||
          calories.toString().includes(searchQuery) ||
          fat.toString().includes(searchQuery)
      )
    : items;

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);
  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, margin: win.width * 0.025, gap: 8 }}>
        <Text style={styles.text}>History screen</Text>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <DataTable style={{ ...theme.table, flex: 1 }}>
          <DataTable.Header>
            <DataTable.Title>Dessert</DataTable.Title>
            <DataTable.Title numeric>Calories</DataTable.Title>
            <DataTable.Title numeric>Fat</DataTable.Title>
          </DataTable.Header>

          {filteredItems.slice(from, to).map((item) => (
            <DataTable.Row
              onPress={() => {
                router.replace(`/map/${item.key}`);
              }}
              key={item.key}
            >
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
              <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
            </DataTable.Row>
          ))}
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(filteredItems.length / itemsPerPage)}
            onPageChange={setPage}
            label={`${from + 1}-${to} of ${filteredItems.length}`}
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
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#000",
    textAlign: "center",
  },
});
