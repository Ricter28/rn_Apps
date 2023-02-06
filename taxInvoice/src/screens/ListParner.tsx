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
import images from "assets/images";
import FastImage from "react-native-fast-image";
import HeaderScreen from "components/headers/HeaderScreen";
import { useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { navigationRef } from "services/navigationService";
import { useNavigation } from "@react-navigation/native";
import modal from "services/modalService";
import userService from "services/userService";

function ListParner(props: any) {
  const navigation = useNavigation();
  let listParner = useSelector((state: any) => state.userReducer.listPartner);
  const renderItem = (item: any, index: number) => {
    return (
      <TouchableOpacity key={''+ index} onPress={()=>action(item,index)} style={[styles.item]}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.name}>{item.website}</Text>
      </TouchableOpacity>
    );
  };
  const deletePartner = (Arr: any, value: any) => {
    const tmpPartner = Arr.filter(
      (item: any, index: number) => index !== value
    );
    modal.showLoading();
    setTimeout(() => {
      userService.setParner(tmpPartner);
      modal.hide();
    }, 1000);
  };
  useEffect(() => {}, [listParner]);
const action = (item:any,index?:number)=>{
  ActionSheet.options({
    options: [
      { text: "Edit", onPress:()=>navigation.navigate('CreateParner',{item,index,type:'edit'})  },
      { text: "Delete" ,  onPress:()=> deletePartner(listParner,index) },
    ],

    cancel: { onPress: () => console.log("cancel") },
  });
}

  return (
    <View style={styles.container}>
      <HeaderScreen title="List parner" back />
      {listParner.length > 0 ?
      <FlatList
        data={listParner}
        renderItem={({ item, index }) => renderItem(item, index)}
      /> : (<Text style={{textAlign:'center',marginTop:'50%'}}> Danh sách trống... </Text>)}
    </View>
  );
}

export default ListParner;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.BACKGROUND,
  },

  item: {
    borderColor: "#DADADA",
    borderWidth: 1,
    // flexDirection: "row",
    // alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 30,
    width: layout.window.width * 0.9,
    alignSelf: "center",
    marginBottom: 15,
    backgroundColor: "rgb(224,255,255)",
    ...layout.shadow,
    paddingVertical: 10,
  },
  iconLeft: {
    fontSize: 20,
    marginRight: 10,
  },
  btnUpdate: {
    backgroundColor: colors.WHITE,
    width: layout.window.width * 0.9,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 20,
  },
  label: {
    marginLeft: layout.window.width * 0.07,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18,
    fontFamily: "Inter-ExtraLight",
    color: "#000000",
  },
  name: {
    fontFamily: "Inter-ExtraLight",
    fontSize: 18,
    paddingVertical: 2,
  },
});
