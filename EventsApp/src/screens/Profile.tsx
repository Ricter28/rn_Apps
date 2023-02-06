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

// import { NativeModules } from 'react-native';

// NativeModules.RNCustomFonts.loadFont('../assets/fonts/Inter-Thin.tff');
function Profile(props: any) {
  let user = useSelector((state: any) => state.userReducer.user);
  const { type } = props.route.params || {};
  const [avatar, setAvatar] = useState(user.avatar||null);
  const navigation = useNavigation();


  const [name, setName] = useState(user.name||"");

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      console.log("image from camera", image);
      //   uploadAvatar(image);
      setAvatar(image?.path || "");
    });
  };

  const openLibrary = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      console.log("image from library", image);
      setAvatar(image?.sourceURL || image.path);
      //   uploadAvatar(image);
    });
  };
  const setUser = () => {
    if (!name) return modal.showMessage({ content: "Vui lòng nhập đầy đủ thông tin" });
    modal.showLoading();
    setTimeout(() => {
      userService.setUser(
        {
          name: name || "",
          avatar:avatar||''
        },
      );
      modal.hide();
      // modal.showMessage({ content: "Thành công" });
      navigation.reset({index:1,routes:[{name:'Home'}]})
    }, 2000);

  };
  return (
    <View style={styles.container}>
      <ScrollView style={{ flexGrow: 1 }}>
        <View style={styles.header}>
          {type && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" type="Entypo" size={26} color="#fff" />
            </TouchableOpacity>
          )}
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
          {avatar ? (
            <FastImage source={{ uri: avatar }} style={styles.logo} />
          ) : (
            <>
              <FastImage
                source={require("../assets/images/avatar.png")}
                style={styles.logo}
              />
              <FastImage
                source={require("../assets/images/logoCamera.png")}
                style={styles.logoCamera}
              />
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.name}>{user.name||'Your Name'}</Text>

        <Text style={styles.label}>Name</Text>
        <View style={[styles.item]}>
          <TextInput
            value={name}
            onChangeText={(value) => setName(value)}
            placeholderTextColor="#CCCCCC"
            style={styles.input}
          />
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => setUser()} style={styles.btn}>
        <Text style={styles.txtButton}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Profile;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.BACKGROUND,
    paddingHorizontal: 20,
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

  label: {
    marginTop: 50,
    marginBottom: 10,
    fontSize: 18,
    fontFamily: "Inter-Bold",
    // fontWeight:'500'
    color: colors.TEXT_GRAY,
  },

  btn: {
    width: "90%",
    height: 50,
    backgroundColor: colors.BUTTON,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    ...layout.shadow,
    marginBottom: layout.bottomHeight + 30,
  },
  txtButton: {
    textAlign: "center",
    alignSelf: "center",
    color: colors.TEXT_WHITE,
    fontWeight: "bold",
    fontSize: 15,
  },

  shadowAvt: {
    width: layout.window.width * 0.4,
    height: layout.window.width * 0.4,
    borderRadius: (layout.window.width * 0.4) / 2,
    // backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20,
    marginTop: "10%",
    // backgroundColor:'red'
  },
  logo: {
    width: layout.window.width * 0.4,
    height: layout.window.width * 0.4,
    borderRadius: (layout.window.width * 0.4) / 2,
    // backgroundColor:'red',
    alignSelf: "center",
  },
  logoCamera: {
    width: layout.window.width * 0.06,
    height: layout.window.width * 0.05,
    marginTop: -layout.window.width * 0.06 - 10,
    marginLeft: layout.window.width / 2,
  },

  icon: {
    width: 15,
    aspectRatio: 1,
  },
  name: {
    alignSelf: "center",
    fontSize: 24,
    color: colors.TEXT_WHITE,
    fontFamily: "Inter-Bold",
  },
});
