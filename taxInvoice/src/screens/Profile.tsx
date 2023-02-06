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
import modal from "services/modalService";
import { useSelector } from "react-redux";
import userService from "services/userService";
import { useNavigation } from "@react-navigation/native";

// import { NativeModules } from 'react-native';

// NativeModules.RNCustomFonts.loadFont('../assets/fonts/Inter-Thin.tff');
function Profile(props: any) {
  const [logo, setLogo] = useState();
  const navigation = useNavigation();
  let user = useSelector((state: any) => state.userReducer.user);

  const [name, setName] = useState(user.name || "");
  const [address, setAddress] = useState(user.address || "");
  const [website, setWebsite] = useState(user.website || "");
  const [phone, setPhone] = useState(user.phone || "");
  const setUser = () => {
    if (
      !address ||
      !name ||
      !website ||
      !phone 
    )
  return modal.showMessage({ content: "Vui lòng nhập đầy đủ thông tin" });
    modal.showLoading();
    setTimeout(() => {
      userService.setUser([
        {
          name: name || "",
          address: address || "",
          website: website || "",
          phone: phone || "",
          logo: logo || "",
        },
      ]);
      // setAddress("");
      // setName("");
      // setPhone("");
      // setWebsite("");
      // setLogo(null);
      modal.hide();
      modal.showMessage({ content: "Thành công" });
    }, 2000);
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      console.log("image from camera", image);
      //   uploadAvatar(image);
    });
  };

  const openLibrary = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      console.log("image from library", image.sourceURL);
      setLogo(image?.sourceURL || "");
      //   uploadAvatar(image);
    });
  };

  //   const uploadAvatar = async image => {
  //     try {
  //       helpers.showLoading();
  //       let rs = await request.upImage(image);
  //       helpers.hideModal();
  //       if (!rs || !rs?.url) return;
  //       handleInput({ name: 'avatar', value: rs.url });
  //     } catch (error) {
  //       console.log('err up image', error);
  //     }
  //   };
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ScrollView>
          <HeaderScreen title="Setup your profile" back titleEdit="Skip" clickEdit={()=>navigation.goBack()} />

          <Text style={styles.label}>
            Company name
            <Text style={{ color: colors.RED, fontSize: 18 }}>*</Text>
          </Text>
          <View style={[styles.item]}>
            <TextInput
              value={name}
              onChangeText={(value) => setName(value)}
              placeholderTextColor="#CCCCCC"
              style={styles.input}
            />
          </View>

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

          <Text style={styles.label}>Logo</Text>
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
                  source={require("../assets/images/Vector.png")}
                  style={styles.logoCamera}
                />
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>setUser()} style={styles.btn}>
            <Text style={styles.txtButton}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

export default Profile;
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
  gender: {
    borderRadius: 20,
    borderColor: "#BCBCBC",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    width: layout.window.width * 0.4,
    marginBottom: 15,
    height: 40,
  },
  wrapGender: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: layout.window.width * 0.05,
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
});
