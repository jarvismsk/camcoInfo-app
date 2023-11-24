import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

const API_URL = 'https://arcane-caverns-64937-622e2d9b7ed8.herokuapp.com/mobilenumber';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}?timestamp=${Date.now()}`);
      const result = await response.json();
      setData(result.reverse());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRefresh = async () => {
    await fetchData();
  };

  const renderItem = ({ item, index }) => {
    const isMostRecent = index === 0;

    return (
      <View style={[styles.item, isMostRecent && styles.mostRecentItem]}>
        <Text style={[styles.itemText, styles.modelText]}>Model: {item.model}</Text>
        <Text style={styles.itemText}>Mobile Number: {item.mobilenumber}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recent Camera Entries</Text>
      <Button title="Refresh" onPress={handleRefresh} style={styles.refreshButton} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 10,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    marginTop: 25,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 3,
  },
  mostRecentItem: {
    backgroundColor: '#e6f7ff',
  },
  itemText: {
    fontWeight: 'bold',
    fontSize: 19,
    color: 'black',
  },
  modelText: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'blue',
  },
  refreshButton: {
    marginBottom: 10,
  },
  flatList: {
    marginTop: 20,
    marginBottom: 10,
  },
});

export default App;
