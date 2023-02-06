import React, { Component } from "react";
import { View, StyleSheet, ImageProps, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import images from "assets/images";
import Icon from "./Icon";
import colors from "contant/colors";
interface AvatarProps extends ImageProps {
  size?: "sm" | "md" | "lg" | "xlg";
  shadow?: Boolean;
  border?: Boolean;
  style?: Object;
  onPress?: Function;
  uri?: String;
}
type CustomProps = Omit<AvatarProps, "source">;
export default class Avatar extends Component<CustomProps, any> {
  constructor(props: AvatarProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { uri, size, shadow, border, style, onPress } = this.props;
    var avt = [];
    var Box: any = View;
    if (onPress) Box = TouchableOpacity;
    if (size === "sm") avt.push(styles.sm);
    if (size === "md") avt.push(styles.md);
    if (size === "lg") avt.push(styles.lg);
    if (size === "xlg") avt.push(styles.xlg);
    if (shadow) avt.push(styles.shadow);
    if (border) avt.push(styles.border);

    return (
      <Box onPress={onPress} style={[styles.default, avt, style]}>
        <View style={[avt, styles.radiusAvt]}>
          <FastImage
            resizeMode="contain"
            source={uri ? { uri } : images.LOGO_STORE}
            style={styles.imgAvt}
          />
          {!uri ? (
            <Icon
              type="Fontisto"
              name="shopping-store"
              // color="#90A4AE"
              color={colors.PRIMARY}
              style={styles.icon}
              size={21}
            />
          ) : null}
        </View>
      </Box>
    );
  }
}
const styles = StyleSheet.create({
  default: {
    backgroundColor: "#fff",
  },
  icon: {
    position: "absolute",
    top: "32%",
    alignSelf: "center",
    opacity: 0.8,
  },
  imgAvt: {
    // backgroundColor: "#F5F5F5",
    flex: 1,
  },
  radiusAvt: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,

    elevation: 3,
  },
  sm: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  md: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  lg: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  xlg: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  border: {
    borderWidth: 2,
    borderColor: "#fff",
  },
});
