import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Login from "../components/Login";
import NetworkLayer from "../api";

export default function Users() {
  var [username, setUsername] = useState("");
  var [loggedIn, setLoggedIn] = useState(false);
  var [loading, setLoading] = useState(false);
  var [users, setUsers] = useState([]);

  handleLogin = async () => {
    console.log("Logging in with username:", username);
    setLoading(true);
    const response = await NetworkLayer.signin(username);

    if (response) {
      const all_users = await NetworkLayer.seeAllUsers();
      console.log("all users", all_users);
      setUsers(all_users);
      setLoggedIn(true);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <>
      {loggedIn ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {users.map((user) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingHorizontal: 20,
                  height: 50,
                }}
              >
                <Text>{user.username}</Text>
                <Text>{user.signin_count}</Text>
              </View>
            );
          })}

          <TouchableOpacity
            style={{
              height: 50,
              width: 100,
              backgroundColor: "#2196F3",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              setLoggedIn(false);
              setUsername("");
            }}
          >
            <Text>loggout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 0.4,
            }}
          >
            <Login
              username={username}
              setUsername={setUsername}
              handleLogin={handleLogin}
            />
          </View>
        </View>
      )}
    </>
  );
}
