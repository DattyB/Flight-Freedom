import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const MoreInfo = () => {
  var [isRuniningQuery, setIsRunningQuery] = useState(false);
  const [clickedAircrafts, setClickedAircrafts] = useState(false);
  const [clickedFlights, setClickedFlights] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const Aircrafts_average = () => {
    console.log("Hey there button pressed");
  };

  const handleFlightsClicked = () => {
    setIsLoading(true);
    setIsRunningQuery(true);
    setTimeout(() => {
      setClickedFlights(true);
      setClickedAircrafts(false);

      setIsLoading(false);
    }, 1000);
  };

  const handleAircraftsClicked = () => {
    setIsRunningQuery(true);
    setIsLoading(true);
    setTimeout(() => {
      setClickedAircrafts(true);
      setClickedFlights(false);
      setIsLoading(false);
    }, 1000);
  };

  const flightsHolidayButton = () => {
    console.log("Ready button pressed");
  };
  const firstAircraftName = [
    "N003AA",
    "N004AA",
    "N005AA",
    "N006AA",
    "N007AA",
    "N008AA",
    "N009AA",
    "N010AA",
    "N011AA",
    "N012AA",
    "N013AA",
    "N014AA",
  ];
  const secondAircraftName = [
    "N837VA",
    "N838VA",
    "N839VA",
    "N840VA",
    "N841VA",
    "N842VA",
    "N843VA",
    "N844VA",
    "N845VA",
    "N846VA",
    "N847VA",
  ];
  const buttonViews = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleAircraftsClicked}
        >
          <Text style={styles.buttonText}>
            Aircrafts that flew greater than the average distance of all
            aircrafts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleFlightsClicked}>
          <Text style={styles.buttonText}>
            Name of Flights that flew only on Holiday Periods
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const QueryResult = () => {
    console.log("isRuniningQuery", isRuniningQuery);
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {clickedAircrafts ? (
          <View style={{ flex: 0.9 }}>
            {firstAircraftName.map((name) => (
              <View
                key={name}
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                }}
              >
                <Text style={styles.resultText}>{name}</Text>
              </View>
            ))}
          </View>
        ) : null}
        {clickedFlights ? (
          <View style={{ flex: 0.9 }}>
            {secondAircraftName.map((name) => (
              <View
                key={name}
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                }}
              >
                <Text style={styles.resultText}>{name}</Text>
              </View>
            ))}
          </View>
        ) : null}
        <View style={{ flex: 0.1 }}>
          <TouchableOpacity onPress={() => setIsRunningQuery(false)}>
            <Text
              style={{
                color: "black",
                fontSize: 18,
              }}
            >
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {isRuniningQuery === false ? buttonViews() : <QueryResult />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#2c3e50",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  resultText: {
    fontSize: 16,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MoreInfo;
