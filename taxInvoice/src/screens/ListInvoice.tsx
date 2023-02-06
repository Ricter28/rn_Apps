import React, { useState, useLayoutEffect, useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import Carousel, {
  getInputRangeFromIndexes,
  Pagination,
} from "react-native-snap-carousel";

import { useTheme, useNavigation } from "@react-navigation/native";

import { useSelector } from "react-redux";
import colors from "contant/colors";
import layout from "contant/layout";
import FastImage from "react-native-fast-image";
import SplashScreen from "react-native-splash-screen";
import HeaderScreen from "components/headers/HeaderScreen";
import moment from "moment";
import { FlatList } from "react-native-gesture-handler";
import { formatMoney } from "utils/format";

const ListInvoice = () => {
  const navigation = useNavigation();
  let invoiced = useSelector((state: any) => state.userReducer.invoiced);
  const renderItemInvoice = (item: any, index: number) => {
    return (
      <TouchableOpacity
        key={"" + index}
        onPress={() =>
          navigation.navigate("RenderInvoice", {
            partner: item.partner,
            listInvoice: item.listInvoice,
            title: item.title,
            website: item.website,
            address: item.address,
            phone: item.phone,
          })
        }
      >
        <View style={styles.wrapTitleInvoice}>
        <Text numberOfLines={1} style={{ fontSize: 20, fontFamily: "Inter-Bold",width:'70%' }}>
            {item?.title || "---"}
          </Text>
          <Text style={styles.txtInvoice}>{item.website}</Text>
          <Text style={styles.txtInvoice}>{item.date}</Text>
        </View>
        <FastImage
          source={require("../assets/images/iconInvoice.png")}
          // resizeMode="contain"
          style={styles.imageInvoice}
        />
        <Text style={styles.price}>$ {formatMoney(item.total)}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <HeaderScreen title="List Invoiced" back />
      <FlatList
        contentContainerStyle={{ paddingBottom: 150 }}
        data={invoiced}
        renderItem={({ item, index }) => renderItemInvoice(item, index)}
      />
    </View>
  );
};

export default ListInvoice;
const styles = StyleSheet.create({
  imageInvoice: {
    width: layout.widthScreen * 0.8,
    aspectRatio: 1.5,
    margin: 10,
    borderRadius: 15,
    alignSelf: "center",
  },
  txtTitle: {
    fontSize: 18,
    color: "#028FDE",
  },
  wrapTitleInvoice: {
    backgroundColor: "#ECECEC",
    position: "absolute",
    width: "80%",
    alignSelf: "center",
    zIndex: 1,
    opacity: 0.8,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  txtInvoice: {
    fontSize: 16,
    fontFamily: "Inter-ExtraLight",
  },
  price: {
    position: "absolute",
    bottom: 15,
    right: layout.width * 0.15,
    color: "#028FDE",
    fontFamily: "Inter-Bold",
    fontSize: 16,
  },
});
