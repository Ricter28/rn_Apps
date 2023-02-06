import React from 'react';
import {Platform, StatusBar} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';

import Constants from '../common/Constants';
import {scaleHeightSize} from '../common/mixins';

export const setBarStyle = (barStyle: any = 'dark-content') => {
  StatusBar.setBarStyle(barStyle);
};

export const setTranslucent = (value = true) => {
  if (Platform.OS === 'android') StatusBar.setTranslucent(value);
};

export const setBackgroundColor = (background = '#ffffff') => {
  if (Platform.OS === 'android')
    StatusBar.setBackgroundColor(background, false);
};

// export function FocusAwareStatusBar(props: any) {
//   const isFocused = useIsFocused();

//   return isFocused ? <StatusBar {...props} /> : null;
// }

export const hasNotch = DeviceInfo.hasNotch();
export const hasDynamicIsland = DeviceInfo.hasDynamicIsland();

export const getMarginTopHeaderBar = () => {
  let marginTop: any = 0;
  if (Constants.isIOS) {
    if (hasDynamicIsland) {
      marginTop = scaleHeightSize(55);
    } else if (hasNotch) {
      marginTop = scaleHeightSize(10);
    } else {
      marginTop = scaleHeightSize(10);
    }
  } else if (Constants.isAndroid) {
    marginTop = StatusBar.currentHeight;
  } else {
    marginTop = scaleHeightSize(25);
  }

  return marginTop;
};
