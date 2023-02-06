import {
  NavigationHelpersContext,
  useNavigation,
} from "@react-navigation/native";
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  TextStyle,
  Text,
} from "react-native";
import CustomText from "../native/Text";
import CustomIcon from "../others/Icon";
import colors from "contant/colors";
import { getStatusBarHeight, ifIphoneX } from "react-native-iphone-x-helper";
import LinearGradient from "react-native-linear-gradient";
import { AnyIfEmpty } from "react-redux";
import layout from "contant/layout";
import { navigationRef } from "services/navigationService";
interface Props {
  title: string;
  LeftComponent?: React.ReactElement | any;
  RightComponent?: React.ReactElement | any;
  titleStyle?: TextStyle;
  titleEditStyle?: TextStyle;
  titleEdit?: string;
  clickEdit?: any;
  back?: any;

}
const HeaderScreen = (props: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      {props.back ? (
        <TouchableOpacity
          style={styles.btBack}
          onPress={() => navigation.goBack()}
        >
          <CustomIcon
            name="chevron-left"
            type="Entypo"
            color={colors.BUTTON}
            size={25}
          />
        </TouchableOpacity>
      ) : null}

      <Text style={[props.titleStyle, styles.title]}>{props.title}</Text>

      <TouchableOpacity
        onPress={() => props.clickEdit()||{}}
        style={styles.btnEdit}
      >
        <Text style={[props.titleEditStyle,styles.titleEdit]}>{props.titleEdit}</Text>
      </TouchableOpacity>
      {props.RightComponent || null}
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingBottom: 20,

    borderColor: "#EBEBEB",
    alignItems: "center",
    backgroundColor: "#fff",
    ...ifIphoneX(
      {
        paddingTop: getStatusBarHeight() + 20,
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
    paddingRight: 50,
    fontSize: 20,
    color: colors.TEXT_BLACK,
    fontWeight: "bold",
  },
  titleEdit: {
    // fontSize: 14,
    color: colors.BLUE,
    textAlign: "center",
  },
  btnEdit: {
    position: "absolute",
    right: 10,
    top: layout.statusbarHeight + 10,
  },
});
export default HeaderScreen;
