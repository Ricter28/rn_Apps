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

const widthItem = layout.window.width * 0.65;
const OnBoarding = ({ dotColor = colors.RED, position = "home" }) => {
  const [slideBannerActive, setSlideBannerActive] = useState(0);
  const [ready, setReady] = useState(Platform.OS == "ios");
  const navigation = useNavigation();
  const slide = useRef(null);
  const [bannerShow, setBannerShow] = useState([1, 2, 3]);
  
  // React.useEffect(() => {
  //   SplashScreen.hide();
  // }, []);
  // vvvvvv BANNER vvvvvvv

  //   const bannerShow = [
  //     { id: 1, image: require("../assets/images/intro.ong") },
  //     { id: 2, image: require("../assets/images/intro.ong") },
  //     { id: 3, image: require("../assets/images/intro.ong") },
  //   ];
  const _renderItemBanner = ({ item, index }) => {
    return (
      <View>
        <FastImage
          resizeMode="stretch"
          style={{
            borderRadius: 10,
            width: widthItem,
            height: layout.window.height * 0.6,
          }}
          source={require("../assets/images/intro.png")}
        />
      </View>
    );
  };


    // if (!bannerShow?.length) return null;
  return (
    <View style={{ flexGrow: 1 }}>
      <View style={styles.wrapTitle}>
        <Text style={styles.title}>
          Smart tax calculation. Create invoices and more
        </Text>
      </View>
      <Carousel
        removeClippedSubviews={false}
        loop
        autoplay={true}
        firstItem={1}
        data={bannerShow}
        renderItem={_renderItemBanner}
        sliderWidth={layout.window.width}
        itemWidth={widthItem}
        inactiveSlideScale={0.8}
        onBeforeSnapToItem={(index) => setSlideBannerActive(index)}
      />
      {/* <Pagination
        dotsLength={bannerShow.length}
        activeDotIndex={slideBannerActive}
        containerStyle={{
          backgroundColor: "transparent",
          // position: 'absolute',
          zIndex: 10,
          bottom: 0,
          alignSelf: "center",
          paddingVertical: 10,
        }}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 4,
          marginHorizontal: -5,
          backgroundColor: dotColor,
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.7}
      /> */}
      <View style={styles.wrapPage}>
        <Text style={styles.page}>{slideBannerActive + 1}/3</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.btn}>
        <Text style={styles.txtButton}>Get Started</Text>
      </TouchableOpacity>
    </View>
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
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Inter-Light",
  },
  btn: {
    width: "80%",
    height: 50,
    backgroundColor: colors.BUTTON,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    ...layout.shadow,
    marginBottom: 30,
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
