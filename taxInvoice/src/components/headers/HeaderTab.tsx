import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { View, StyleSheet, StatusBar, Platform, TextStyle } from "react-native";
import Text from "../native/Text";
import { getStatusBarHeight, ifIphoneX } from "react-native-iphone-x-helper";
import LinearGradient from "react-native-linear-gradient";
import colors from "contant/colors";
interface HeaderProps {
  title?: string;
  RightComponent?: React.ReactChild | React.ReactElement;
  titleStyle?: TextStyle;
}
const HeaderTab = (props: any) => {
  return (
    <LinearGradient
      colors={colors.GRADIENT}
      start={{ x: 0, y: 1.2 }}
      end={{ x: 0.7, y: 0 }}
      style={styles.linear}
    >
      {/* <StatusBar barStyle="dark-content" /> */}
      <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
      {props.RightComponent || null}
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  linear: {
    flexDirection: "row",
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderColor: "#EBEBEB",
    alignItems: "center",
    backgroundColor: "#fff",
    ...ifIphoneX(
      {
        paddingTop: getStatusBarHeight() + 24,
      },
      {
        paddingTop: getStatusBarHeight() + 10,
      }
    ),
  },
  btBack: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    paddingBottom: 12,
  },
});
export default HeaderTab;
