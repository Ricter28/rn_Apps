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
import userService from "services/userService";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import modal from "services/modalService";
import PickerSelect from "components/PickerSelect";
import ListParner from "./ListParner";
import { navigate } from "services/navigationService";

function CreateInvoice(props: any) {
  const navigation = useNavigation();
  let invoiced = useSelector((state: any) => state.userReducer.invoiced);
  let listInvoice = useSelector((state: any) => state.userReducer.listInvoice);
  let listParner = useSelector((state: any) => state.userReducer.listPartner);
  const [title, setTitle] = useState("");
  const [partner, setPartner] = useState([]);
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [QTY, setQTY] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [total, setTotal] = useState("");
  let sum = 0;

  listInvoice.forEach(function(item:any) {
      sum += Number(item.total);
  });
  const addInvoice = () => {
    modal.showLoading();
    setTimeout(() => {
      userService.setListInvoice([
        ...listInvoice,
        {
          description: description || "",
          QTY: QTY || "",
          unitPrice: unitPrice || "",
          total: total || "",
        },
      ]);
 
      setDescription("");
      setQTY("");
      setUnitPrice("");
      setTotal("");
      modal.hide();
    }, 1000);
  };
  const deleteInvoice = (Arr: any, value: any) => {
    const tmpInvoice = Arr.filter(
      (item: any, index: number) => index !== value
    );
    modal.showLoading();
    setTimeout(() => {
      userService.setListInvoice(tmpInvoice);
      modal.hide();
    }, 1000);
  };
  const publish = () => {
    if (
      !address ||
      !title ||
      !website ||
      !phone ||
      !partner
    )
  return modal.showMessage({ content: "Vui lòng nhập đầy đủ thông tin" });
    setTimeout(() => {
         userService.setInvoiced([
        ...invoiced,
        {
          listInvoice:listInvoice,
          title:title,
          partner:partner,
          address:address,
          website:website,phone:phone,
          date:moment().format('DD/MM/YYYY'),
          total: sum || "",
        },
      ]);
      userService.setListInvoice([]);
      modal.hide();
      navigation.navigate("RenderInvoice", {
        partner: partner,
        listInvoice: listInvoice,
        title: title,
        website: website,
        address: address,
        phone: phone,
      })
    }, 1000);
  };
  useEffect(() => {}, [description, unitPrice, listInvoice, partner]);
  const renderItemInvoice = (item: any, index: number) => {
    return (
      <View key={" " + index} style={styles.wrapItemInvoice}>
        <View style={styles.itemInvoice}>
          <Text style={styles.txtInvoice}>
            Description: {item.description}{" "}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.txtInvoice}>QTY/HR : {item.QTY} </Text>
            <Text style={styles.txtInvoice}>
              Unit Price : {item.unitPrice} $
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.txtInvoice}>Total: {item.total} $</Text>
            <TouchableOpacity onPress={() => deleteInvoice(listInvoice, index)}>
              <Text
                style={[styles.txtInvoice, { fontSize: 14, color: colors.RED }]}
              >
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <HeaderScreen
          title=""
          back
          titleEdit="Publish"
          titleEditStyle={{
            fontFamily: "Inter-Bold",
            fontSize: 18,
            marginTop: 15,
          }}
          clickEdit={() =>{publish();
       
          }}
        />

        <Text style={styles.label}>
          Title
          <Text style={{ color: colors.RED, fontSize: 18 }}>*</Text>
        </Text>
        <View style={[styles.item]}>
          <TextInput
            value={title}
            onChangeText={(value) => setTitle(value)}
            placeholderTextColor="#CCCCCC"
            style={styles.input}
          />
        </View>
        {Object.keys(partner).length > 1 && (
          <View style={styles.wrapPartner}>
            <Text style={styles.titlePartner}>
              Name: <Text style={styles.txtPartner}>{partner.name || ""}</Text>
            </Text>
            <Text style={styles.titlePartner}>
              Address:{" "}
              <Text style={styles.txtPartner}>{partner.address || ""}</Text>
            </Text>
            <Text style={styles.titlePartner}>
              Website:{" "}
              <Text style={styles.txtPartner}>{partner.website || ""}</Text>
            </Text>
            <Text style={styles.titlePartner}>
              Phone:{" "}
              <Text style={styles.txtPartner}>{partner.phone || ""}</Text>
            </Text>
          </View>
        )}
        <Text style={styles.label}>
          Partner
          <Text style={{ color: colors.RED, fontSize: 18 }}>*</Text>
        </Text>

        <PickerSelect
          value={partner}
          data={listParner}
          title="List Partner"
          labelStyle={{ fontSize: 16 }}
          placeholder=""
          onChangeValue={(value: any) => {
            setPartner(value);
            console.log(partner);
          }}
          style={[styles.partner]}
          renderIcon={() => {
            return (
              <Icon name="caretdown" type="AntDesign" size={16} color="gray" />
            );
          }}
        />

        <Text style={styles.label}>
          Address<Text style={{ color: colors.RED, fontSize: 18 }}>*</Text>
        </Text>
        <View style={[styles.item]}>
          <TextInput
            value={address}
            onChangeText={(value) => setAddress(value)}
            placeholderTextColor="#CCCCCC"
            style={styles.input}
          />
        </View>

        <Text style={styles.label}>Website</Text>
        <View style={[styles.item]}>
          <TextInput
            value={website}
            onChangeText={(value) => setWebsite(value)}
            placeholderTextColor="#CCCCCC"
            style={styles.input}
          />
        </View>

        <Text style={styles.label}>Phone number</Text>
        <View style={[styles.item]}>
          <TextInput
            value={phone}
            onChangeText={(value) => setPhone(value)}
            placeholderTextColor="#CCCCCC"
            style={styles.input}
          />
        </View>

        <View style={styles.line} />

        {listInvoice.map((item: any, index: number) =>
          renderItemInvoice(item, index)
        )}

        <View style={styles.line} />

        <Text style={styles.label}>Description</Text>
        <View style={[styles.item]}>
          <TextInput
            value={description}
            onChangeText={(value) => setDescription(value)}
            placeholderTextColor="#CCCCCC"
            style={styles.input}
          />
        </View>

        <Text style={styles.label}>QTY/HR</Text>
        <View style={[styles.item]}>
          <TextInput
            value={QTY}
            onChangeText={(value) => setQTY(value)}
            placeholderTextColor="#CCCCCC"
            style={styles.input}
          />
        </View>

        <Text style={styles.label}>Unit price</Text>
        <View style={[styles.item]}>
          <TextInput
            value={unitPrice}
            onChangeText={(value) => setUnitPrice(value)}
            placeholderTextColor="#CCCCCC"
            style={styles.input}
          />
        </View>

        <Text style={styles.label}>Total</Text>
        <View style={[styles.item]}>
          <TextInput
            value={total}
            onChangeText={(value) => setTotal(value)}
            placeholderTextColor="#CCCCCC"
            style={styles.input}
          />
        </View>

        <TouchableOpacity onPress={() => addInvoice()} style={styles.btn}>
          <Text style={styles.txtButton}>Add</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default CreateInvoice;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.BACKGROUND,
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
    width: layout.window.width * 0.4,
    height: layout.window.width * 0.4,
    borderRadius: (layout.window.width * 0.4) / 7,
  },
  logoCamera: {
    width: layout.window.width * 0.06,
    height: layout.window.width * 0.05,

    marginTop: -layout.window.width * 0.06 - 10,
    marginLeft: (layout.window.width * 0.4) / 2 + 20,
  },
  input: {
    height: 50,
    width: layout.window.width * 0.9 - 50,
    color: "#222222",
    fontSize: 18,
  },
  item: {
    borderColor: "#DADADA",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 20,
    width: layout.window.width * 0.9,
    alignSelf: "center",
    marginBottom: 15,
    backgroundColor: "#fff",
    ...layout.shadow,
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
    // fontWeight:'500'
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
    marginBottom: 40,
  },
  txtButton: {
    textAlign: "center",
    alignSelf: "center",
    color: colors.TEXT_WHITE,
    fontWeight: "bold",
    fontSize: 18,
  },
  txtPartner: {
    fontFamily: "Inter-Light",
    fontSize: 17,
  },
  wrapPartner: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  titlePartner: {
    fontFamily: "Inter-Bold",
    fontSize: 17,
  },
  line: {
    width: "100%",
    height: 0.5,
    backgroundColor: colors.BLACK,
  },
  wrapItemInvoice: {
    paddingHorizontal: 20,
  },
  itemInvoice: {
    padding: 10,
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    marginVertical: 10,
  },
  txtInvoice: {
    fontFamily: "Inter-Light",
    fontSize: 16,
    paddingVertical: 1,
  },
  partner: {
    borderColor: "#DADADA",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 20,
    width: layout.window.width * 0.9,
    alignSelf: "center",
    marginBottom: 15,
    backgroundColor: "#fff",
    ...layout.shadow,
    height: 50,
  },
});
