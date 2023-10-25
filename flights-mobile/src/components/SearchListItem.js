import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const SearchListItem = ({ item, addFavorites }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isVisited, setIsVisited] = useState(false);
  const yes = "yes" || "Yes" || "YES";
  const handleFavoritePress = () => {
    //addFavorites(item.IATA_CODE, item.airport_name, item.city_name);
    setIsFavorite(!isFavorite);
  };

  const handleVisitedPress = () => {
    setIsVisited(!isVisited);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.IATA_CODE}</Text>
        <Text style={styles.description}>{item.airport_name}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleFavoritePress}
          style={[styles.button, isFavorite && styles.buttonActive]}
        >
          <FontAwesome
            name={isFavorite ? "heart" : "heart-o"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleVisitedPress}
          style={[styles.button, item.isVisited && styles.buttonActive]}
        >
          <FontAwesome
            name={isVisited ? "check-square-o" : "square-o"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  buttonActive: {
    backgroundColor: "#2196F3",
  },
});

export default SearchListItem;
