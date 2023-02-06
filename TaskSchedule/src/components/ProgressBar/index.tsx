import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, Animated, View} from 'react-native';

interface IProps {
  step: number;
  steps: number;
  height: number;
  bgProgress: string;
  bgAnimProgress: string;
}

const ProgressBar = ({
  step,
  steps,
  height,
  bgProgress,
  bgAnimProgress,
}: IProps) => {
  const [width, setWith] = useState(0);
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [step, width]);

  return (
    <View
      onLayout={e => {
        const newWidth = e.nativeEvent.layout.width;
        setWith(newWidth);
      }}
      style={{
        height: height,
        borderRadius: height,
        overflow: 'hidden',
        backgroundColor: bgProgress,
        zIndex: 1,
      }}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            height: height,
            borderRadius: height,
            backgroundColor: bgAnimProgress,
            transform: [
              {
                translateX: animatedValue,
              },
            ],
          },
        ]}
      />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  progressBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    zIndex: 2,
  },
});
