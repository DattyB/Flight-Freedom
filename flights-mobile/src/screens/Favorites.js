import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";

import SearchBar from "../components/SearchBar";
import SearchListItem from "../components/SearchListItem";
import NetworkLayer from "../api";
import important_data from "../utils";

const fakedata = [
  {
    id: "1",
    title: "Item 1",
    description: "This is the first item",
    isVisited: true,
  },
  {
    id: "2",
    title: "Item 2",
    description: "This is the second item",
    isVisited: true,
  },
  {
    id: "3",
    title: "Item 3",
    description: "This is the third item",
    isVisited: true,
  },
];

const Favorites = () => {
  var [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  var [data, setData] = useState(important_data);
  var [isLoading, setLoading] = useState(false);

  const search = async (text) => {
    setLoading(true);
    const searchData = await NetworkLayer.api_search(text);
    console.log("search data", searchData);
    setData(searchData);
    setLoading(false);
  };

  const handleSearch = (text) => {
    setLoading(true);
    setTimeout(() => {
      const filteredData = important_data.filter((item) =>
        item.IATA_CODE.includes(text.toUpperCase())
      );
      setData(filteredData);
      setSearchText(text);
      setIsSearching(true);
      setLoading(false);
    }, 1000);

    // search(text);
  };

  useEffect(() => {
    if (searchText.length == 0) {
      setIsSearching(false);
    }
  }, [searchText]);

  const deleteFavorite = async (IATA_CODE) => {
    setLoading(true);
    await NetworkLayer.api_delete(IATA_CODE);
    setLoading(false);
  };

  const addFavorite = async (
    IATA_CODE = "",
    airport_name = "",
    visited = "no"
  ) => {
    setLoading(true);
    await NetworkLayer.api_insert(IATA_CODE, airport_name, visited);
    setLoading(false);
  };

  const setIsVisited = async (IATA_CODE = "", visited = "no") => {
    setLoading(true);
    await NetworkLayer.api_update(IATA_CODE, visited);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View
          style={{
            flex: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <View
        style={{
          flex: 0.2,
          width: "90%",
          alignItems: "center",
          marginTop: 16,
        }}
      >
        <SearchBar onSearch={handleSearch} />
      </View>
      <View
        style={{
          flex: 0.8,
          width: "100%",
        }}
      >
        {data.length === 0 && (
          <Text style={styles.title}>Search Something</Text>
        )}

        <FlatList
          data={data}
          renderItem={({ item }) => <SearchListItem item={item} />}
          keyExtractor={(item) => item.id}
          style={{ width: "100%", marginTop: 16 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#F5FCFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  result: {
    fontSize: 18,
    marginTop: 16,
  },
});

export default Favorites;
