import * as React from "react";
import {
  View,
  StyleSheet,
  ViewProps,
  ViewStyle,
  TouchableOpacity,
} from "react-native";

interface BoxProps extends ViewProps, ViewStyle {
  width?: number;
  height?: number | string;
  flex?: number;
  row?: boolean;
  alignItems?: "center" | "baseline" | "flex-end" | "flex-start";
  justifyContent?:
    | "center"
    | "flex-end"
    | "flex-start"
    | "space-around"
    | "space-between"
    | "space-evenly";
  onPress?: () => void;
  top?: number | string;
}
export default class Box extends React.Component<BoxProps> {
  render() {
    const { children, style, row, onPress, ...props } = this.props;
    var custom = [];
    if (row) custom.push(styles.row);
    var Custom: any;
    Custom = View;
    if (onPress) Custom = TouchableOpacity;
    return (
      <Custom {...props} onPress={onPress} style={[style, custom]}>
        {this.props.children}
      </Custom>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
