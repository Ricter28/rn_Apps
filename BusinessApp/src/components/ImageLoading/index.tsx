import React, {memo, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';

import styles from './styles';

interface IProps {
  resizeMode?: string | undefined;
  iconStyle?: any;
  url?: any;
  source?: any;
}

const ImageLoading = ({resizeMode, iconStyle, url, source}: IProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  const getResizeMode = (resizeMode: any) => {
    switch (resizeMode) {
      case 'cover':
        return FastImage.resizeMode.cover;
      case 'stretch':
        return FastImage.resizeMode.stretch;
      case 'center':
        return FastImage.resizeMode.center;
      default:
        return FastImage.resizeMode.contain;
    }
  };

  const onLoadEndImage = () => {
    setLoading(false);
  };

  const getUseImage = (url: any, source: any) => {
    if (url) {
      return (
        <FastImage
          style={[styles.image, iconStyle]}
          onLoadEnd={onLoadEndImage}
          source={{
            uri: url,
            cache: FastImage.cacheControl.immutable,
          }}
          resizeMode={getResizeMode(resizeMode)}
        />
      );
    } else if (source) {
      return (
        <FastImage
          style={[styles.image, iconStyle]}
          onLoadEnd={onLoadEndImage}
          source={source}
          resizeMode={getResizeMode(resizeMode)}
        />
      );
    } else {
      return null;
    }
  };

  const renderLoading = () => {
    return (
      <View style={styles.viewLoading}>
        {/* <ActivityIndicator
          size="large"
          // color={colors.purple5C3595}
          style={styles.loading}
        /> */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading && renderLoading()}

      {getUseImage(url, source)}
    </View>
  );
};

export default ImageLoading;
