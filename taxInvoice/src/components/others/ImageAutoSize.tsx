import * as React from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';

interface ImageAutoSizeProps extends FastImageProps { }

const ImageAutoSize = (props: ImageAutoSizeProps) => {
  const [aspect, setAspect] = useState(2);
  return (
    <FastImage
      onLoad={evt => {
        const { width, height } = evt.nativeEvent;
        setAspect(width / height);
      }}
      {...props}
      style={[
        {
          aspectRatio: aspect,
        },
        props.style,
      ]}
    />
  );
};

export default ImageAutoSize;

const styles = StyleSheet.create({});
