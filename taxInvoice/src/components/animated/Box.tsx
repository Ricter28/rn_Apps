import React from "react";
import { Button, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  withSequence,
} from "react-native-reanimated";

function Box() {
  const offset = useSharedValue(0);
  const rotation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value * 255 }],
    };
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });
  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value * 255, {
            damping: 20,
            stiffness: 90,
          }),
        },
      ],
    };
  });
  return (
    <>
      <Animated.View style={[styles.box, animatedStyles]} />
      <Animated.View style={[styles.box, customSpringStyles, animatedStyle]} />
      <Button
        onPress={() => {
          (rotation.value = withSequence(
            // withTiming(-10, { duration: 50 }),
            withRepeat(withTiming(10, { duration: 100 }), 6, true),
            withTiming(10, { duration: 50 })
          )),
            (offset.value = Math.random());
        }}
        title="Move"
      />
      {/* <Animated.View style={[styles.box, animatedStyle]} /> */}
      {/* <Button
        title="wobble"
        onPress={() => {
          rotation.value = withSequence(
            withTiming(-10, { duration: 50 }),
            withRepeat(withTiming(10, { duration: 100 }), 6, true),
            withTiming(10, { duration: 50 })
          );
        }}
      /> */}
    </>
  );
}
export default Box;

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: "red",
    borderRadius: 10,
    margin: 10,
  },
});
