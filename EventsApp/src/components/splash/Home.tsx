import React, { useRef, useState } from "react";
import { Animated, Dimensions, Image, ScrollView, View } from "react-native";
import { Text } from "react-native-animatable";
import FastImage from "react-native-fast-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Post's....

export default function Home() {
  const edges = useSafeAreaInsets();
  const [color, setColor] = useState(false);
  const Post1 =
    "https://vcdn1-dulich.vnecdn.net/2020/11/21/1-1605972569.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=Gs5VBQ9eOvNSi6tNWUhkRQ";

  const onScroll = (event: any) => {
    setColor(Math.round(event.nativeEvent.contentOffset.y) > 0);
  };
  return (
    <View>
      <ScrollView
        style={{ backgroundColor: color ? "#fff" : "red" }}
        onScroll={onScroll}
      >
        <View
          style={{
            paddingLeft: 15,
            paddingRight: 15,
            paddingTop: edges.top + 65,
            paddingBottom: 25,
          }}
        >
          {[Post1, Post1, Post1, Post1, Post1].map((item, index) => {
            return (
              <FastImage
                source={{ uri: item }}
                key={index}
                style={{
                  width: Dimensions.get("window").width - 30,
                  height: 250,
                  borderRadius: 15,
                  marginTop: 20,
                }}
              ></FastImage>
            );
          })}
        </View>
      </ScrollView>
      {color && (
        <TouchableOpacity
          style={{
            width: 70,
            height: 70,
            backgroundColor: "blue",
            position: "absolute",
            bottom: 50,
            right: 10,
          }}
        >
          <Text>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
