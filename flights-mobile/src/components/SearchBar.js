import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";

const SearchBar = ({ onSearch }) => {
  const [text, setText] = useState("");

  const handleChangeText = (value) => {
    setText(value);
  };

  const handleSearch = () => {
    onSearch(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search text"
        value={text}
        onChangeText={handleChangeText}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "85%",
    height: 48,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 4,
  },
  input: {
    flex: 1,
    height: "100%",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 4,
    fontSize: 16,
  },
  button: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: "#007AFF",
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SearchBar;
