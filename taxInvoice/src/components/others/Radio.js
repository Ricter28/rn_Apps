import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import CustomIcon from "../others/Icon";
import CustomText from "../native/Text";

type props = {
  active?: Boolean,
  onPress?: () => {},
  color?: String,
  size?: Number,
  box?: Boolean,
  disabled?: Boolean,
  lable?: String,
  group?: Boolean,
};
export default class Radio extends Component<props> {
  constructor(props) {
    super(props);
    this.state = {
      active: props.active ?? false,
    };
  }
  toggle = () => {
    this.setState(
      (pre) => {
        return { active: !pre.active };
      },
      () => {
        this.props.onPress?.(this.state.active);
      }
    );
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.active !== this.props.active ||
      (this.props.group && this.props.active !== this.state.active)
    ) {
      this.setState({ active: this.props.active });
    }
  }
  render() {
    const { active } = this.state;
    const { size, color, box, disabled, lable } = this.props;
    return (
      <View>
        <TouchableOpacity
          disabled={disabled}
          onPress={this.toggle}
          style={styles.bt}
        >
          {box ? (
            <CustomIcon
              type="MaterialCommunityIcons"
              name={
                active ? "checkbox-marked-outline" : "checkbox-blank-outline"
              }
              size={size || 24}
              color={color || "#fff"}
            />
          ) : (
            <CustomIcon
              type="Feather"
              name={active ? "check-circle" : "circle"}
              size={size || 24}
              color={color || "#fff"}
            />
          )}
          <CustomText style={styles.lable}>{lable}</CustomText>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  bt: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 4,
  },
  lable: {
    marginLeft: 4,
  },
});
