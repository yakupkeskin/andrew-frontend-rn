import * as React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import LoginNavigator from "./components/LoginNavigator";
import HomeNavigator from "./components/HomeNavigator";
import { Provider } from "react-redux";
import store from "./redux/store";


export default function App({ navigation, route }) {
  const [loggedIn, setLoggedIn] = useState(true);
  const asd = () => {
    console.log("Alooo");
  };

  useEffect(() => {
    console.log("Use Effect App.js");
  }, [loggedIn]);

  if (route) {
    console.log(route);
    console.log("Route vardır");
  }
  Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginNavigator"
            component={LoginNavigator}
            options={{
              title: "Twitter",
              backgroundColor: "#1DA1F2",
              headerStyle: {
                backgroundColor: "#1DA1F2",
              },
            }}
          />
          <Stack.Screen
            name="HomeNavigator"
            component={HomeNavigator}
            options={{
              title: "Twitter",
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: "#1DA1F2",
              },
            }}
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});