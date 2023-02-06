import * as React from "react";
import { View, StyleSheet, ViewProps, TouchableOpacity } from "react-native";

interface RowProps extends ViewProps {
  onPress?: () => void;
}
export default class Row extends React.Component<RowProps> {
  render() {
    const { children, style, onPress, ...props } = this.props;
    var Custom: any = View;
    if (onPress) Custom = TouchableOpacity;
    return (
      <Custom {...props} onPres={onPress} style={[styles.row, style]}>
        {this.props.children}
      </Custom>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
