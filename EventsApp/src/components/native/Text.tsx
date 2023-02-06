import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text as TextNative,
  TextProps,
} from "react-native";
import colors from "../../contant/colors";
import config from "../../contant/config";
interface Props extends TextProps {
  bold?: boolean;
  italic?: boolean;
  center?: boolean;
  color?: string;
  fontSize?: number;
}
export default class Text extends Component<Props> {
  render() {
    const { children, style, bold, italic, center, color, fontSize, ...props } =
      this.props;
    var custom = [];
    if (bold) custom.push(styles.bold);
    if (italic) custom.push(styles.italic);
    if (center) custom.push(styles.center);
    if (bold && italic) custom.push(styles.boldItalic);
    if (color) custom.push({ color });
    if (fontSize) custom.push({ fontSize });
    return (
      <TextNative {...props} style={[styles.font, custom, style]}>
        {children}
      </TextNative>
    );
  }
}
const styles = StyleSheet.create({
  font: {
    fontFamily: config.FONT,
    color: colors.TEXT,
    fontSize: 14,
  },
  center: {
    textAlign: "center",
  },
  bold: {
    fontFamily: Platform.OS == "ios" ? "Arial" : "Arial_Bold",
    fontWeight: Platform.OS == "ios" ? "bold" : "normal",
  },
  italic: {
    fontFamily: Platform.OS == "ios" ? "Arial" : "Arial_Italic",
    fontStyle: Platform.OS ? "italic" : "normal",
  },
  boldItalic: {
    fontFamily: Platform.OS == "ios" ? "Arial" : "Arial_Bold_Italic",
    fontWeight: Platform.OS == "ios" ? "bold" : "normal",
    fontStyle: Platform.OS ? "italic" : "normal",
  },
});
