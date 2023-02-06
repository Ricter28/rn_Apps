import images from "assets/images";
import Box from "components/animated/Box";
import WheelOfFortune from "components/animated/Spin";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Image, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Home from "./Home";

const BGColor = "#4D4A95";
const FastImaged = Animated.createAnimatedComponent(FastImage);
export default function SplashScreen() {
  const edges = useSafeAreaInsets();

  const startAnimation = useRef(new Animated.Value(0)).current;

  const scaleLogo = useRef(new Animated.Value(1)).current;
  const scaleTitle = useRef(new Animated.Value(1)).current;

  const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const moveTitle = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const contentTransition = useRef(
    new Animated.Value(Dimensions.get("window").height)
  ).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(startAnimation, {
          toValue: -Dimensions.get("window").height + (edges.top + 120),
          useNativeDriver: true,
        }),
        Animated.timing(scaleLogo, {
          toValue: 0.3,
          useNativeDriver: true,
        }),
        Animated.timing(scaleTitle, {
          toValue: 0.8,
          useNativeDriver: true,
        }),
        Animated.timing(moveLogo, {
          toValue: {
            x: Dimensions.get("window").width / 2 - 35,
            y: Dimensions.get("window").height / 2 - 37,
          },
          useNativeDriver: true,
        }),
        Animated.timing(moveTitle, {
          toValue: {
            x: 0,

            y: Dimensions.get("window").height / 2 - 120,
          },
          useNativeDriver: true,
        }),
        Animated.timing(contentTransition, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1000);
  }, []);

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: BGColor,
          zIndex: 1,
          transform: [{ translateY: startAnimation }],
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FastImaged
            source={require("../../../N7.png")}
            style={{
              width: 100,
              height: 100,
              marginBottom: 20,
              transform: [
                { translateX: moveLogo.x },
                { translateY: moveLogo.y },
                { scale: scaleLogo },
              ],
            }}
          />

          <Animated.Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "white",
              transform: [{ translateY: moveTitle.y }, { scale: scaleTitle }],
            }}
          >
            Home
          </Animated.Text>
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0,0,0,0.04)",
          zIndex: 0,
          transform: [{ translateY: contentTransition }],
        }}
      >
        {/* <Home /> */}
        <WheelOfFortune />
      </Animated.View>
    </View>
  );
}
