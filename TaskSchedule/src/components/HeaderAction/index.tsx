import React, {memo} from 'react';
import {Text, View, TouchableOpacity, Image, ViewStyle} from 'react-native';

import styles from './styles';
import Images from 'common/Images';

interface IProps {
  title?: string;
  titleActionRight?: string;
  goBack?: () => void;
  onPressText?: () => void;
  textTitleProps?: ViewStyle | ViewStyle[];
  rightActionBtnStyle?: ViewStyle | ViewStyle[];
  rightActionTxtStyle?: any;
  rightActionTxt?: string;
}

const HeaderAction = ({
  title,
  titleActionRight,
  goBack,
  onPressText,
  textTitleProps,
  rightActionTxt,
  rightActionBtnStyle,
  rightActionTxtStyle,
}: IProps) => {
  return (
    <View style={styles.container}>
      {goBack ? (
        <TouchableOpacity style={styles.leftContainer} onPress={goBack}>
          <View style={styles.arrowLeftBtn}>
            <Image source={Images.arrowLeft} style={styles.icBack} />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.leftContainer} />
      )}

      <View style={styles.centerContainer}>
        {title && title.length > 0 && (
          <Text style={[styles.textTitle, textTitleProps && textTitleProps]}>
            {title}
          </Text>
        )}
      </View>

      <View style={styles.rightContainer}>
        {rightActionTxt && rightActionTxt.length > 0 && (
          <TouchableOpacity
            onPress={onPressText}
            style={rightActionBtnStyle}
            activeOpacity={0.9}>
            <Text style={rightActionTxtStyle}>{titleActionRight}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default memo(HeaderAction);
