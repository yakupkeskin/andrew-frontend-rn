//This is where our app start.
import * as React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import LoginNavigator from "./components/LoginNavigator";
import HomeNavigator from "./components/HomeNavigator";
import { Provider } from "react-redux"; // We use provider for the components that we want to use redux in.
import store from "./redux/store";


export default function App({ navigation, route }) {

  Stack = createNativeStackNavigator();
  return (
    <Provider store={store}> 
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginNavigator"
            component={LoginNavigator}
            options={{
              title: "Andrewitter",
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
              title: "Andrewitter",
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