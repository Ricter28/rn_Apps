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
import AppIcon from "react-native-dynamic-app-icon";
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
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { formatMoney } from "utils/format";

function Home(props: any) {
  const navigation = useNavigation();

  let invoiced = useSelector((state: any) => state.userReducer.invoiced);

  const renderItemInvoice = (item: any, index: number) => {
    return (
      <TouchableOpacity
      key={''+index}
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
  const handleIconChange = () => {
    if(new Date().getFullYear() === 2022 &&
    new Date().getMonth() === 11 &&
    new Date().getDate() === 19){
    AppIcon.setAppIcon('SetLogo2');
  }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.date}>Today {moment().format("YYYY/MM/DD")}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("CreateParner")}>
          <Text style={styles.txtCreate}>Create Partner</Text>
          <FastImage
            source={require("../assets/images/logoHome.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.txtTitle}>Invoiced</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {invoiced.map((item:any, index:any) => renderItemInvoice(item, index))}
          </ScrollView>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("ListInvoice")}
          style={[styles.item]}
        >
          <Text style={styles.input}>List invoiced</Text>
          <Icon name="chevron-right" type="Entypo" size={24} color="#969696" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("ListParner")}
          style={[styles.item]}
        >
          <Text style={styles.input}>Partners</Text>
          <Icon name="chevron-right" type="Entypo" size={24} color="#969696" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={[styles.item]}
        >
          <Text style={styles.input}>Setting</Text>
          <Icon name="chevron-right" type="Entypo" size={24} color="#969696" />
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.navigate("CreateInvoice")}
        style={styles.btn}
      >
        <Text style={styles.txtButton}>Create Invoice</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.BACKGROUND,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: layout.statusbarHeight + 10,
  },
  shadowAvt: {
    width: layout.window.width * 0.4,
    height: layout.window.width * 0.4,
    borderRadius: (layout.window.width * 0.4) / 7,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  logo: {
    width: "100%",
    height: layout.heightScreen * 0.3,
    borderRadius: (layout.window.width * 0.4) / 4,
    alignSelf: "center",
  },

  input: {
    flex: 1,
    color: "#222222",
    fontSize: 18,
    fontFamily: "Inter-Light",
    paddingVertical: 10,
  },
  item: {
    borderColor: "#DADADA",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 20,
    width: "95%",
    alignSelf: "center",
    marginBottom: 15,
    backgroundColor: "#fff",
    ...layout.shadow,
  },

  label: {
    marginLeft: layout.window.width * 0.07,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18,
    fontFamily: "Inter-ExtraLight",
    color: "#000000",
  },

  btn: {
    width: "90%",
    height: 50,
    backgroundColor: colors.BUTTON,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    ...layout.shadow,
    marginBottom: layout.bottomHeight + 20,
  },
  txtButton: {
    textAlign: "center",
    alignSelf: "center",
    color: colors.TEXT_WHITE,
    fontWeight: "bold",
    fontSize: 18,
  },
  txtCreate: {
    position: "absolute",
    alignSelf: "center",
    zIndex: 100,
    marginTop: (layout.heightScreen * 0.3) / 2 - 20,
    fontSize: 24,
    fontWeight: "bold",
    color: colors.BLUE,
  },
  imageInvoice: {
    width: layout.widthScreen * 0.5,
    aspectRatio: 1.5,
    margin: 10,
    borderRadius: 15,
  },
  txtTitle: {
    fontSize: 18,
    color: "#028FDE",
  },
  wrapTitleInvoice: {
    backgroundColor: "#ECECEC",
    position: "absolute",
    width: "90%",
    alignSelf: "center",
    zIndex: 1,
    opacity: 0.8,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  txtInvoice: {
    fontSize: 14,
    fontFamily: "Inter-ExtraLight",
  },
  price: {
    position: "absolute",
    bottom: 15,
    right: 22,
    color: "#028FDE",
    fontFamily: "Inter-Bold",
  },
  date:{
    fontSize:20,
    fontFamily:'Inter-ExtraLight'
  }
});
