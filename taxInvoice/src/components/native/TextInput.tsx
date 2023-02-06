import * as React from "react";
import {
  View,
  StyleSheet,
  TextInput as InputNative,
  TextInputProps,
} from "react-native";
import colors from "../../contant/colors";
import config from "../../contant/config";

interface CustomInputProps extends TextInputProps {}

const TextInput = (props: CustomInputProps) => {
  return (
    <InputNative
      allowFontScaling={false}
      ref={(ref) =>
        ref &&
        ref.setNativeProps({
          style: {
            fontFamily: config.FONT,
          },
        })
      }
      {...props}
      style={[styles.input, props.style]}
    />
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {},
  input: {
    fontFamily: config.FONT,
    color: colors.TEXT_BLACK,
  },
});
