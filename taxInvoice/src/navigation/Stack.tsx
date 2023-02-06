import * as React from "react";
import { View, StyleSheet } from "react-native";
import { TransitionPresets } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "screens/Profile";
import CreateParner from "screens/CreateParner";
import Home from "screens/Home";
import CreateInvoice from "screens/CreateInvoice";
import BottomTab from "./BottomTab";
import OnBoarding from "screens/OnBoardind";
import ListParner from "screens/ListParner";
import RenderInvoice from "screens/RenderInvoice";
import ListInvoice from "screens/ListInvoice";
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
      <MainStack.Screen name="CreateParner" component={CreateParner} />
      <MainStack.Screen name="CreateInvoice" component={CreateInvoice} />
      <MainStack.Screen name="OnBoarding" component={OnBoarding} />
      <MainStack.Screen name="ListParner" component={ListParner} />
      <MainStack.Screen name="RenderInvoice" component={RenderInvoice} />
      <MainStack.Screen name="ListInvoice" component={ListInvoice} />
    </MainStack.Navigator>
  );
};

export default Stack;
