import * as React from "react";
import { View, StyleSheet } from "react-native";
import { TransitionPresets } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "screens/Profile";

import Home from "screens/Home";
import CreateEvent from "screens/CreateEvent";
import BottomTab from "./BottomTab";
import OnBoarding from "screens/OnBoardind";
import Notification from "screens/Notification";

const MainStack = createNativeStackNavigator();

interface StackProps {}

const Stack = (props: StackProps) => {
  return (
    <MainStack.Navigator
      initialRouteName="OnBoarding"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
        // gestureEnabled: true,
      }}
    >
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="Profile" component={Profile} />
      <MainStack.Screen name="OnBoarding" component={OnBoarding} />
      <MainStack.Screen name="CreateEvent" component={CreateEvent} />
      <MainStack.Screen name="Notification" component={Notification} />
    </MainStack.Navigator>
  );
};

export default Stack;
