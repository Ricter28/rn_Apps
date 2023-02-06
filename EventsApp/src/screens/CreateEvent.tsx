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
import modal from "services/modalService";
import { useSelector } from "react-redux";
import userService from "services/userService";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "components/pickers/DateTimePicker";

function CreateEvent(props: any) {
  const data = [
    { id: 1, title: "Concert", image: require("../assets/images/imageConcert.png") },
    { id: 2, title: "Sports", image: require("../assets/images/imageSport.png") },
    { id: 3, title: "Education", image: require("../assets/images/imageEducation.png") },
  ];
  const [logo, setLogo] = useState(null);
  const navigation = useNavigation();
  let user = useSelector((state: any) => state.userReducer.user);
  let listEvent = useSelector((state: any) => state.userReducer.listEvent);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [time, setTime] = useState();
  const [active,setActive]=useState(0)
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      console.log("image from camera", image);
      //   uploadAvatar(image);
      setLogo(image?.path)
    });
  };

  const openLibrary = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      setLogo(image?.sourceURL || image.path);
      //   uploadAvatar(image);
    });
  };

  // const edit = () => {
  //   var arr = [...listEvent];

  //   if (!address || !name || !website || !phone)
  //     return modal.showMessage({ content: "Vui lòng nhập đầy đủ thông tin" });
  //   arr.forEach(function (element, i) {
  //     if (i == index) {
  //       arr[i] = {
  //         name: name || "",
  //         address: address || "",
  //         website: website || "",
  //         phone: phone || "",
  //       };
  //     }
  //   });
  //   modal.showLoading();
  //   setTimeout(() => {
  //     userService.listEvent(arr);
  //     setAddress("");
  //     setName("");
  //     setPhone("");
  //     setWebsite("");
  //     modal.hide();
  //     modal.showMessage({ content: "Thành công" });
  //     navigation.goBack();
  //   }, 1000);
  // };
  const addEvent = () => {
    if (!address || !name || !time || !logo||!active)
      return modal.showMessage({ content: "Vui lòng nhập đầy đủ thông tin" });
    modal.showLoading();
    setTimeout(() => {
      userService.setListEvent([
        ...listEvent,
        {
          name: name || "",
          address: address || "",
          image: logo || "",
          time: moment(time).valueOf() || "",
          type:data[active-1].title
        },
      ]);
      setAddress("");
      setName("");
      setLogo();
      setTime();
      modal.hide();
      modal.showMessage({ content: "Thành công" });
      navigation.goBack();
    }, 1000);
  };
 const renderItemCategoryEvent = (item:any,index:number)=>{
    return(
      <TouchableOpacity onPress={()=>{setActive(item.id),console.log(data[index].title, active)}} key={''+index} style={active == item.id ?styles.btnActiveEvent: styles.btnEvent}>
      <FastImage
        source={item.image}
        style={styles.imgCategoryEvent}
        resizeMode="contain"
      />
      <Text style={styles.txtCategoryEvent}>{item.title}</Text>
    </TouchableOpacity>
    )
 }
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom:20}} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" type="Entypo" size={26} color="#fff" />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.txtHeader}>
              Create{" "}
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Inter-Bold",
                  color: colors.TEXT_YELLOW,
                }}
              >
                Event
              </Text>
            </Text>
          </View>
        </View>

        <View>
          <Text style={styles.titleCategoryEvent}>Events Type</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {data.map((item,index)=>renderItemCategoryEvent(item,index))}

          </View>
        </View>

        <TouchableOpacity
          style={styles.shadowAvt}
          onPress={() => {
            ActionSheet.options({
              options: [
                { text: "Chụp ảnh", onPress: openCamera },
                { text: "Chọn từ thư viện", onPress: openLibrary },
              ],
              cancel: { onPress: () => console.log("cancel") },
            });
          }}
        >
          {logo ? (
            <FastImage source={{ uri: logo }} style={styles.logo} />
          ) : (
            <>
              <FastImage
                source={require("../assets/images/upload.png")}
                style={styles.logo}
              />
              <FastImage
                source={require("../assets/images/logoCamera.png")}
                style={styles.logoCamera}
              />
            </>
          )}
        </TouchableOpacity>
        <Text style={styles.label}>Title</Text>
        <View style={[styles.item]}>
          <TextInput
            value={name}
            onChangeText={(value) => setName(value)}
            placeholderTextColor="#CCCCCC"
            style={styles.input}
          />
        </View>
        <Text style={styles.label}>Time</Text>
        <DateTimePicker
          mode="datetime"
          date={time}
          style={styles.item}
          showIcon={false}
          onConfirm={setTime}
        />

        <Text style={styles.label}>Address</Text>
        <View style={[styles.item]}>
          <TextInput
            value={address}
            onChangeText={(value) => setAddress(value)}
            placeholderTextColor="#CCCCCC"
            style={styles.input}
          />
        </View>

        <TouchableOpacity onPress={() => addEvent()} style={styles.btn}>
          <Text style={styles.txtButton}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default CreateEvent;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.BACKGROUND,
    paddingHorizontal: 20,
  },

  input: {
    height: 50,
    width: layout.window.width * 0.9 - 50,
    color: "#fff",
    fontSize: 18,
  },
  item: {
    borderBottomColor: "#FFA300",
    borderBottomWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 20,
    width: layout.window.width * 0.85,
    alignSelf: "center",
    marginBottom: 15,
    backgroundColor: colors.BUTTON,
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
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    fontFamily: "Inter-Bold",
    // fontWeight:'500'
    color: colors.TEXT_GRAY,
  },

  btn: {
    width: "80%",
    height: 50,
    backgroundColor: colors.BUTTON,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    ...layout.shadow,
    marginTop: 30,
  },
  txtButton: {
    textAlign: "center",
    alignSelf: "center",
    color: colors.TEXT_WHITE,
    fontWeight: "bold",
    fontSize: 15,
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
  shadowAvt: {
    width: layout.window.width * 0.4,
    height: layout.window.width * 0.4,
    borderRadius: (layout.window.width * 0.4) / 7,
    // backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20,
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
    marginLeft: layout.window.width / 2,
  },

  titleCategoryEvent: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    color: "rgba(255, 255, 255, 0.5)",
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
  btnActiveEvent: {
    width: "30%",
    aspectRatio: 1,
    backgroundColor: colors.ACTIVEBUTTON,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
  },
});
