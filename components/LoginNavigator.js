//Navigation for login and signup
import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/login/Login";
import Signup from "../screens/login/Signup";

export default function LoginNavigator({ navigation }) {
  Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "Login",
          headerBackVisible: false,
          headerBackButtonMenuEnabled: "false",
          headerStyle: {
            backgroundColor: "white",
          },
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          title: "Sign Up!",
          headerBackButtonMenuEnabled: "false",
          headerStyle: {
            backgroundColor: "white",
          },
        }}
      />
    </Stack.Navigator>
  );
}
