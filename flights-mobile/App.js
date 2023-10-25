import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TabBar from "./src/navigation/TabBar";

const App = () => {
  return (
    <NavigationContainer>
      <TabBar />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default App;
