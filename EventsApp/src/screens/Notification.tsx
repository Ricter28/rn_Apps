import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Platform,
  TextInput,
  TouchableOpacity,
  // Text
} from "react-native";

import KeyboardSpacer from "react-native-keyboard-spacer";

import ImagePicker from "react-native-image-crop-picker";

import DatePicker from "react-native-datepicker";
import moment from "moment";
import Toast from "react-native-toast-message";
import { ActionSheet } from "react-native-cross-actionsheet";
import layout from "contant/layout";
import Text from "components/native/Text";
import Icon from "components/others/Icon";
import colors from "contant/colors";

import FastImage from "react-native-fast-image";
import HeaderScreen from "components/headers/HeaderScreen";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

function Notification(props: any) {
  const navigation = useNavigation();

  let listEvent = useSelector((state: any) => state.userReducer.listEvent);
  // const dataComing = listEvent.splice(0,2)

  const dataComing =()=>{
    const tmp = listEvent.filter(
      (item: any, index: number) => Number(moment(item.time).valueOf()) > Number(moment().valueOf())
    ); 
    return tmp
  }
  const dataPast =()=>{
    const tmp = listEvent.filter(
      (item: any, index: number) => Number(moment(item.time).valueOf()) < Number(moment().valueOf())
    ); 
    return tmp
  }
  const renderItemEvent = (item:any,index:number) => {
    return (
      <TouchableOpacity style={styles.itemEvent}>
        <View style={{ paddingHorizontal: 10, paddingTop: 10, width: "65%" }}>
          <View>
            <Text numberOfLines={1} style={[styles.name, { fontSize: 15 }]}>
              {item.name}
            </Text>

            <View style={{ flexDirection: "row", paddingTop: 25 }}>
              <FastImage
                source={require("../assets/images/iconDate.png")}
                resizeMode="contain"
                style={styles.icon}
              />
              <Text style={styles.txtTime}>
                {moment(item.time).format("LT")}{" "}
                <Text style={[styles.txtTime, { color: colors.TEXT_WHITE }]}>
                  {moment(item.time).format("MMM DD,YYYY")}
                </Text>
              </Text>
            </View>

            <View style={{ flexDirection: "row", paddingTop: 5 }}>
              <FastImage
                source={require("../assets/images/iconLocation.png")}
                resizeMode="contain"
                style={styles.icon}
              />
              <Text
                numberOfLines={2}
                style={[styles.txtTime, { color: colors.TEXT_WHITE }]}
              >
                {item.address}
              </Text>
            </View>
          </View>
        </View>
        <FastImage
          source={{uri:item.image}}
          style={styles.imgItemEvent}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Icon name="chevron-left" type="Entypo" size={26} color="#fff" />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.txtHeader}>Notification</Text>
        </View>
      </View>

      <View style={ dataComing().length ? { flexGrow:1} : null}>
        <Text style={[styles.titleCategoryEvent]}>Coming soon</Text>
        <FlatList
          data={dataComing()}
          renderItem={({ item, index }) => renderItemEvent(item,index)}
        />
      </View>

      <View style={{flexGrow:1}}>
        <Text style={[styles.titleCategoryEvent,{color:'#FFFFFF80'}]}>Belong to the past</Text>
        <FlatList
          data={dataPast()}
          renderItem={({ item, index }) => renderItemEvent(item,index)}
        />
      </View>
    </View>
  );
}

export default Notification;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.BACKGROUND,
    paddingHorizontal: 20,
  },
  logo: {
    width: 30,
    aspectRatio: 1,
  },
  header: {
    marginTop: layout.statusbarHeight + 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  txtHeader: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Inter-Bold",
    color: colors.TEXT_WHITE,
    marginLeft: 10,
  },
  wrapUser: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 20,
    color: colors.TEXT_WHITE,
    fontFamily: "Inter-Bold",
  },
  txtIntro: {
    fontFamily: "Inter-Light",
    color: colors.TEXT_WHITE,
    paddingVertical: 5,
  },
  avt: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    backgroundColor: "red",
  },
  imgCategoryEvent: {
    width: "45%",
    aspectRatio: 1,
  },
  btnEvent: {
    width: "30%",
    aspectRatio: 1,
    backgroundColor: "#2A404E",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  titleCategoryEvent: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    color: colors.TEXT_YELLOW,
    marginTop: 20,
  },
  txtCategoryEvent: {
    fontSize: 14,
    fontFamily: "Inter-ExtraLight",
    color: colors.TEXT_WHITE,
    marginTop: 10,
  },
  icon: {
    width: 15,
    aspectRatio: 1,
  },
  itemEvent: {
    backgroundColor: colors.BUTTON,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  imgItemEvent: {
    width: "35%",
    aspectRatio: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  txtTime: {
    fontFamily: "Inter-Light",
    fontSize: 14,
    color: colors.TEXT_YELLOW,
    paddingHorizontal: 10,
  },
});
