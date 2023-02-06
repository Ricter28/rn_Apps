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
import { ScrollView } from "react-native-gesture-handler";
import Icon from "components/others/Icon";

const widthItem = layout.window.width * 0.8;
const OnBoarding = ({  }) => {
  let user = useSelector((state: any) => state.userReducer.user);
  const bannerShow = [
    { id: 1, title: "Concert", image: require("../assets/images/intro.png") },
    { id: 2, title: "Sports", image: require("../assets/images/intro.png") },
    { id: 3, title: "Education", image: require("../assets/images/intro.png") },
  ];
  const [slideBannerActive, setSlideBannerActive] = useState(0);
  const [ready, setReady] = useState(Platform.OS == "ios");
  const navigation = useNavigation();
  const [title, setTitle] = useState(bannerShow[0].title);
  const slide = useRef(null);
  // const [bannerShow, setBannerShow] = useState([1, 2, 3]);

  // React.useEffect(() => {
  //   SplashScreen.hide();
  // }, []);
  // vvvvvv BANNER vvvvvvv

  const _renderItemBanner = (item?: any, index?: number) => {
    return (
      <View style={{ alignSelf: "center" }}>
        <FastImage
          resizeMode="stretch"
          style={{
            borderRadius: 10,
            width: widthItem,
            height: layout.window.height * 0.25,
          }}
          source={require("../assets/images/intro.png")}
        />
      </View>
    );
  };

  // if (!bannerShow?.length) return null;
  return (
    <ImageBackground
      source={require("../assets/images/bgOnboarding.jpeg")}
      style={{ flexGrow: 1 }}
    >
      <View style={styles.wrapTitle}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View
        style={{
          height: layout.heightScreen * 0.5,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 50,
        }}
      >
        <TouchableOpacity
          onPress={() => slide.current.snapToPrev()}
          style={{
            position: "absolute",
            zIndex:1,
            top: 0,
            backgroundColor: "#231E1E80",
            width: layout.window.width * 0.56,
            height: layout.window.height * 0.25 *0.36,
            alignItems:'center',
            justifyContent:'center',
            borderBottomLeftRadius:10,
            borderBottomRightRadius:10
          }}
        >
         <Icon name='chevron-up' type="Entypo" color={colors.WHITE} size={30} />
        </TouchableOpacity>
        <Carousel
          // loop
          ref={slide}
          vertical
          autoplay={false}
          firstItem={1}
          data={bannerShow}
          renderItem={() => _renderItemBanner()}
          sliderHeight={layout.heightScreen * 0.5}
          sliderWidth={layout.window.width}
          itemWidth={widthItem}
          itemHeight={layout.window.height * 0.25}
          useScrollView
          inactiveSlideScale={0.7}
          inactiveSlideOpacity={0.4}
          removeClippedSubviews={true}
          onBeforeSnapToItem={(index) => setSlideBannerActive(index)}
          onSnapToItem={(index) => setTitle(bannerShow[index].title)}
        />
            <TouchableOpacity
          onPress={() => slide.current.snapToNext() }
          style={{
            position: "absolute",
            zIndex:1,
            bottom:0,
            backgroundColor: "#231E1E80",
            width: layout.window.width * 0.56,
            height: layout.window.height * 0.25 *0.35,
            alignItems:'center',
            justifyContent:'center',
            borderTopLeftRadius:10,
            borderTopRightRadius:10
          }}
        >
         <Icon name='chevron-down' type="Entypo" color={colors.WHITE} size={30} />
        </TouchableOpacity>
      </View>
  
 

      <TouchableOpacity
        onPress={() => Object.keys(user).length > 0 ?   navigation.reset({index:1,routes:[{name:'Home'}]}) : navigation.navigate("Profile")  }
        style={styles.btn}
      >
        <Text style={styles.txtButton}>Get Started</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  wrapPage: {
    marginTop: 20,
    alignItems: "flex-end",
    marginRight: 20,
  },
  page: {
    fontFamily: "Inter-Light",
  },

  wrapTitle: {
    paddingHorizontal: 30,
    //   alignSelf:'center'
    marginTop: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    fontFamily: "Inter-Bold",
    color: colors.TEXT_WHITE,
  },
  btn: {
    width: "80%",
    height: 50,
    backgroundColor: colors.BUTTON,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    ...layout.shadow,
    // marginBottom: 30,
    marginTop: 80,
  },
  txtButton: {
    textAlign: "center",
    alignSelf: "center",
    color: colors.TEXT_WHITE,
    fontWeight: "bold",
    fontSize: 18,
    
  },
});
