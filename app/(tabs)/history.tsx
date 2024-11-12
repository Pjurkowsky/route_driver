import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

export default function HistoryScreen() {
    const [searchQuery, setSearchQuery] = React.useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.text}>History screen</Text>
      <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000',
  },
});
