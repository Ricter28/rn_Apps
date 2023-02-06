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

function Home(props: any) {
  let user = useSelector((state: any) => state.userReducer.user);
  let listEvent = useSelector((state: any) => state.userReducer.listEvent);
  const getIndexDay = ()=>{
    const date = new Date();
    const day = date.getUTCDay();
    const days = [];

    for (let i = day; i < 7; i++) {
      days.push(i);
    }

    for (let i = 0; i < day; i++) {
      days.push(i);
    }
   var i = (days.sort().indexOf(day));
   console.log(i,'days')
   return i
  }

  const [active, setActive] = useState(null);
  const [isCategory, setIsCategory] = useState(false);
  const [activeDate, setActiveDate] = useState(getIndexDay());
  const navigation = useNavigation();
  const data = [
    {
      id: 1,
      title: "Concert",
      image: require("../assets/images/imageConcert.png"),
    },
    {
      id: 2,
      title: "Sports",
      image: require("../assets/images/imageSport.png"),
    },
    {
      id: 3,
      title: "Education",
      image: require("../assets/images/imageEducation.png"),
    },
  ];

  function getDaysOfWeek(time: any) {
    const date = new Date(time);
    const day = date.getUTCDay();
    const days = [];

    for (let i = day; i < 7; i++) {
      days.push(i);
    }

    for (let i = 0; i < day; i++) {
      days.push(i);
    }
   var i = (days.indexOf(day));

    const timestamps = [];
    const baseDate = new Date(time);
    baseDate.setUTCHours(0, 0, 0, 0);

    for (let i = 0; i < days.length; i++) {
      const date = new Date(baseDate);
      date.setUTCDate(baseDate.getUTCDate() + (days[i] - baseDate.getUTCDay()));
      timestamps.push(date.getTime());
    }

    return timestamps.sort();
  }

  console.log(getDaysOfWeek(moment().valueOf()));
  const dataPopular = (time?: any) => {
    const tmp = listEvent.filter(
      (item: any, index: number) =>
        moment(item.time).format("DD") == moment(time).format("DD")
    );

    const tmpActive = tmp.filter(
      (item: any, index: number) => item.type == data[active - 1]?.title
    );

    return active ? tmpActive : tmp;
  };
  const renderItemCategoryEvent = (item: any, index: number) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setActive(item.id), setIsCategory(!isCategory);
        }}
        key={"" + index}
        style={active === item.id ? styles.btnActiveEvent : styles.btnEvent}
      >
        <FastImage
          source={item.image}
          style={styles.imgCategoryEvent}
          resizeMode="contain"
        />
        <Text style={styles.txtCategoryEvent}>{item?.title || ""}</Text>
      </TouchableOpacity>
    );
  };

  const renderItemEvent = (item: any, index: number) => {
    return (
      <TouchableOpacity
        onPress={() =>
          ActionSheet.options({
            options: [
              { text: "Edit", onPress: () => {} },
              { text: "Delete", onPress: () => {} },
            ],
            cancel: { onPress: () => console.log("cancel") },
          })
        }
        style={styles.itemEvent}
      >
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
        <FastImage source={{ uri: item.image }} style={styles.imgItemEvent} />
      </TouchableOpacity>
    );
  };

  const renderDayOfWeek = (item: any, index: number) => {
    return (
      <TouchableOpacity
        onPress={() => setActiveDate(index)}
        key={"" + index}
        style={activeDate == index ? styles.btnActiveTime : null}
      >
        <Text style={styles.txtTimeOfWeek}>{moment(item).format("DD")}</Text>
        <Text style={styles.txtTimeOfWeek}>{moment(item).format("dd")}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FastImage
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.txtHeader}>
            Events{" "}
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Inter-Bold",
                color: colors.TEXT_YELLOW,
              }}
            >
              App
            </Text>
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
          <Icon
            name="notifications-outline"
            type="Ionicons"
            size={26}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.wrapUser}>
        <View>
          <Text style={styles.name}>Hello,{user.name}!</Text>
          <Text style={styles.txtIntro}>
            Let’s explore what’s happening nearby
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile", { type: "edit" })}
        >
          <FastImage
            source={
              { uri: user.avatar } || require("../assets/images/avatar.png")
            }
            style={styles.avt}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 30,
        }}
      >
        {getDaysOfWeek(moment().valueOf()).map((item, index) =>
          renderDayOfWeek(item, index)
        )}
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={styles.titleCategoryEvent}>All Events</Text>
          <TouchableOpacity onPress={() => navigation.navigate("CreateEvent")}>
            <FastImage
              source={require("../assets/images/iconAddEvent.png")}
              resizeMode="contain"
              style={{ width: 20, aspectRatio: 1 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {data.map((item, index) => renderItemCategoryEvent(item, index))}
        </View>
      </View>

      <View style={{ marginTop: 20,flexGrow:1 }}>
        <Text style={styles.titleCategoryEvent}>Popolar Events</Text>
        <FlatList
          data={dataPopular(getDaysOfWeek(moment().valueOf())[activeDate])}
          renderItem={({ item, index }) => renderItemEvent(item, index)}
        />
      </View>
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
  btnActiveEvent: {
    width: "30%",
    aspectRatio: 1,
    backgroundColor: colors.ACTIVEBUTTON,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  titleCategoryEvent: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    color: colors.TEXT_YELLOW,
    // marginTop: 20,
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
  btnActiveTime: {
    backgroundColor: colors.ACTIVEBUTTON,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  txtTimeOfWeek: {
    color: colors.TEXT_WHITE,
    fontFamily: "Inter-Bold",
  },
});
