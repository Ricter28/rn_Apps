import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Icon from "components/others/Icon";
import React, { useState } from "react";
import images from "assets/images";
import layout from "contant/layout";
import { useNavigation, useRoute } from "@react-navigation/native";
// import { goBack } from "services/navigationService";

const ANIMAL_NAMES = [
  {
    id: 1,
    lable: "Add",
    lable2: " Create",
    title: "media",
    title2: "attachments",
    title3: "events",
  },
];
const DATA = {
  id: "1",
  name: "Davy Jones",
  title: "Director at ABC company",
  lable: "3 hrs ago (edited)",
  document:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
};

type Props = {
  add?: boolean;
  share?: boolean;
  // route?: any;
};

const Post = (props: Props) => {
    // const route = useRoute();
  // let DATA =props.route.params.DATA;
  // console.log(DATA,'VGHBJNKM')

  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(null);
  const [viewMore, setViewMore] = useState(false);
  return (
    <SafeAreaView style={styles.MainContainer}>
      <View style={styles.hearder}>
        <Text style={styles.txthearder}>Start Post</Text>
      </View>
      <View
        style={{
          borderColor: "#F0EEEB",
        }}
      >
        <View style={styles.item}>
          <Image
            source={images.IMGAVT5}
            style={{
              width: "12.5%",
              height: 48,
              borderRadius: 80,
              marginTop: "1.5%",
            }}
          />
          <View style={styles.active}>
            <Text style={[styles.name]}>Bobby Michael</Text>

            <TouchableOpacity style={styles.touch}>
              <Icon
                color="#157EFA"
                size={14}
                style={{ paddingRight: "3%" }}
                type="Ionicons"
                name="earth-outline"
              />
              <Text style={[styles.lable]}>Public</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.touchpost}>
            <Text style={styles.txtpost}>Post</Text>
          </TouchableOpacity>
          
        </View>
      </View>
      {/* <View style={styles.viewpost}></View> */}
      {props.add ? (
        <View style={{ flex:1,marginTop:layout.window.height/2.2 }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={ANIMAL_NAMES}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={styles.touchFlat}>
                  <View style={styles.content}>
                    <Icon
                      size={22}
                      style={styles.icons}
                      type="MaterialCommunityIcons"
                      name="scan-helper"
                    />
                    <Text style={styles.txtone}>{item.lable}</Text>
                    <Text style={styles.txttwo}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.touchFlat, { backgroundColor: "#A79C87" }]}
                >
                  <View style={styles.content}>
                    <Icon
                      size={25}
                      style={styles.icons}
                      type="Feather"
                      name="paperclip"
                    />
                    <Text style={styles.txtone}>{item.lable}</Text>
                    <Text style={styles.txttwo}>{item.title2}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.touchFlat, { backgroundColor: "#157EFA" }]}
                >
                  <View style={styles.content}>
                    <Icon
                      size={25}
                      style={styles.icons}
                      type="MaterialCommunityIcons"
                      name="calendar-blank-outline"
                    />
                    <Text style={styles.txtone}>{item.lable2}</Text>
                    <Text style={styles.txttwo}>{item.title3}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            horizontal={true}
          />
        </View>
      ) : null}
      {props.share ? (
        <ScrollView style={{}} showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#D9D9D9",
              width: "95%",
              alignSelf: "center",
              marginTop: layout.heightScreen / 8.8,
            }}
          >
            <View style={[styles.item, {}]}>
              <Image
                source={images.IMGAVT}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 80,
                  // marginTop: "1.5%",
                }}
              />
              <View style={styles.active}>
                <TouchableOpacity>
                  <Text style={[styles.name]}>{DATA.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={[styles.title]}>{DATA.title}</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: "row" }}>
                  <Text style={[styles.lable, { color: "#7D7F88" }]}>
                    {DATA.lable}
                  </Text>
                  <Icon
                    color="#7D7F88"
                    size={14}
                    style={{ alignSelf: "center" }}
                    type="Entypo"
                    name="dot-single"
                  />
                  <Icon
                    color="#7D7F88"
                    size={14}
                    style={{ paddingRight: "3%", alignSelf: "center" }}
                    type="Ionicons"
                    name="earth-outline"
                  />
                </View>
              </View>
            </View>
            <Text
              style={styles.documentxt}
              numberOfLines={viewMore ? undefined : 2}
              onPress={() => setViewMore(!viewMore)}
            >
              {DATA.document}
            </Text>
            <Text onPress={() => setViewMore(!viewMore)} style={styles.txtmore}>
              {viewMore ? "See less" : "See more"}
            </Text>
            <Image source={images.IMAGE} style={styles.baner} />
          </View>
        </ScrollView>
      ) : null}

        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => {
            navigation.goBack();
          }}
        >
         <Image source={images.CLEAN} style={{width:65,height:65}}/>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Post;

const styles = StyleSheet.create({
  MainContainer: {
    // flex: 1,
    flexGrow:1,
    backgroundColor: "#fff",
  },
  hearder: {
    // marginTop: "15%",
  },
  txthearder: {
    fontSize: 24,
    fontWeight: "bold",
    borderBottomWidth: 0.5,
    borderColor: "gray",
    paddingLeft: "3%",
    paddingBottom: "3%",
    textAlign: "center",
  },
  content: {
    marginTop: "12%",
    width: "100%",
  },
  icons: {
    textAlign: "center",
    paddingBottom: "5%",
    color: "#ffffff",
  },
  cancel: {
    color: "#B46460",
  },
  txtone: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    color: "#ffffff",
  },
  txttwo: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    color: "#ffffff",
   
  },
  viewpost: {
    paddingBottom: layout.heightScreen / 9,
    // marginHorizontal: 5,
    // marginBottom: "2%",
    // backgroundColor: "red",
  },
  item: {
    padding: "3.5%",
    // backgroundColor: "#ffffff",
    flexDirection: "row",
    width: "100%",
  },
  active: {
    paddingLeft: "4%",
    // width: 200,
    // backgroundColor: "red",
  },
  name: {
    fontSize: 18,
    marginRight: "18%",
    // marginBottom: "3%",
    fontWeight: "bold",
  },
  touch: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#157EFA",
    width: 80,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  touchpost: {
    backgroundColor: "#B46460",
    width: 70,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 20,
    // marginHorizontal: 13,
    alignSelf: "center",
  },
  txtpost: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  lable: {
    fontSize: 13,
    color: "#157EFA",
  },
  touchFlat: {
    backgroundColor: "#B46460",
    height: layout.heightScreen * 0.16,
    width: 130,
    borderRadius: 11,
    marginHorizontal: 7,
  },
  documentxt: {
    marginHorizontal: "3.5%",
    fontSize: 13.5,
  },
  title: {
    fontSize: 17,
  },
  baner: {
    height: 132,
    width: "93.5%",
    // aspectRatio:1,
    marginTop: "4%",
    marginBottom: 20,
    alignSelf: "center",
  },
  txtmore: {
    color: "black",
    fontSize: 12.5,
    fontWeight: "bold",
    paddingLeft: 15,
  },
});
