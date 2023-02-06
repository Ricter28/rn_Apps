import {Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import React from 'react';

import ImageLoading from 'components/ImageLoading';

interface IProps {
  txt: string;
  btnStyles: ViewStyle | ViewStyle[];
  btnTxtStyles: any;
  onPress?: () => void;
  showIcon?: boolean;
  iconStyle?: ViewStyle | ViewStyle[];
  sourceIcon?: any;
  activeOpacity?: number;
}

const ButtonCustom = ({
  txt,
  btnStyles,
  btnTxtStyles,
  onPress,
  showIcon,
  iconStyle,
  sourceIcon,
  activeOpacity,
}: IProps) => {
  if (showIcon) {
    return (
      <TouchableOpacity
        activeOpacity={activeOpacity || 0.7}
        style={btnStyles}
        onPress={onPress}>
        <ImageLoading iconStyle={iconStyle} source={sourceIcon} />
        <Text style={btnTxtStyles}>{txt}</Text>
        <View />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity || 0.7}
      style={btnStyles}
      onPress={onPress}>
      <Text style={btnTxtStyles}>{txt}</Text>
    </TouchableOpacity>
  );
};

export default ButtonCustom;
