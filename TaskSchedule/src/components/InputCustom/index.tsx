import {Text, View, ViewStyle, TextInput} from 'react-native';
import React from 'react';

import ImageLoading from 'components/ImageLoading';
import styles from './styles';

interface IProps {
  btnStyles?: ViewStyle | ViewStyle[];
  value: string;
  onChangeText?: (txt: string) => void;
  showIcon?: boolean;
  iconStyle?: ViewStyle | ViewStyle[];
  inputStyle?: ViewStyle | ViewStyle[];
  sourceIcon?: any;
  txtError: string;
  onFocus?: () => void;
  placeholder?: string;
  keyboardType?: any;
}

const InputCustom = ({
  btnStyles,
  value,
  onChangeText,
  showIcon,
  iconStyle,
  inputStyle,
  sourceIcon,
  txtError,
  onFocus,
  placeholder,
  keyboardType,
}: IProps) => {
  if (showIcon) {
    return (
      <View>
        <View style={btnStyles}>
          <ImageLoading iconStyle={iconStyle} source={sourceIcon} />
          <TextInput
            style={[styles.input, inputStyle]}
            value={value}
            placeholder={placeholder}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            onFocus={onFocus}
          />
        </View>
        {txtError?.length > 0 && <Text style={styles.error}>{txtError}</Text>}
      </View>
    );
  }
  return (
    <View>
      <View style={btnStyles}>
        <TextInput
          style={[styles.input, inputStyle]}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType || undefined}
          onChangeText={onChangeText}
          onFocus={onFocus}
        />
      </View>
      {txtError?.length > 0 && <Text style={styles.error}>{txtError}</Text>}
    </View>
  );
};

export default InputCustom;
