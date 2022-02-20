//Navigator for pages after login.
import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Home from "../screens/content/Home";
import NewTweet from "../screens/content/NewTweet";
import Profile from "../screens/content/Profile";

export default function HomeNavigator({ navigation }) {
  Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      options={{
        style: {
          height: 200,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: {
            backgroundColor: "white",
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={"#1DA1F2"} size={40} />
          ),
        }}
      />
      <Tab.Screen
        name="New Tweet"
        component={NewTweet}
        tabBarIcon={{ name: "plus" }}
        options={{
          headerStyle: {
            backgroundColor: "white",
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus" color={"#1DA1F2"} size={40} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerStyle: {
            backgroundColor: "white",
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-hard-hat"
              color={"#1DA1F2"}
              size={40}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
