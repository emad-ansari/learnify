import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { C } from "../constants/theme";

interface CircularProgressProps {
  progress: number; // 0–1
  color?: string;
  delay?: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  color = C.primary,
  delay = 0,
}) => {
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withDelay(
      delay,
      withTiming(progress, { duration: 1200, easing: Easing.out(Easing.cubic) })
    );
  }, [progress, delay]);

  const size = 54;
  const strokeWidth = 4;

  const rightHalfStyle = useAnimatedStyle(() => {
    const rotation = Math.min(animatedProgress.value * 360, 180) - 180;
    return { transform: [{ rotate: `${rotation}deg` }] };
  });

  const leftHalfStyle = useAnimatedStyle(() => {
    const rotation = Math.max(0, animatedProgress.value * 360 - 180) - 180;
    return { transform: [{ rotate: `${rotation}deg` }] };
  });

  return (
    <View style={{ width: size, height: size }}>
      {/* Background Track */}
      <View style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: strokeWidth,
        borderColor: color,
        opacity: 0.15,
      }} />

      {/* Right Half Container (0-180deg) */}
      <View style={{ position: 'absolute', width: size, height: size, flexDirection: 'row' }}>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 1, overflow: 'hidden' }}>
          <Animated.View style={[{
            width: size / 2,
            height: size,
            backgroundColor: color,
            borderTopRightRadius: size / 2,
            borderBottomRightRadius: size / 2,
            transformOrigin: 'left',
          }, rightHalfStyle]} />
        </View>
      </View>

      {/* Left Half Container (180-360deg) */}
      <View style={{ position: 'absolute', width: size, height: size, flexDirection: 'row' }}>
        <View style={{ flex: 1, overflow: 'hidden' }}>
          <Animated.View style={[{
            width: size / 2,
            height: size,
            backgroundColor: color,
            borderTopLeftRadius: size / 2,
            borderBottomLeftRadius: size / 2,
            transformOrigin: 'right',
          }, leftHalfStyle]} />
        </View>
        <View style={{ flex: 1 }} />
      </View>

      {/* Mask to make it a ring */}
      <View style={{
        position: 'absolute',
        top: strokeWidth,
        left: strokeWidth,
        right: strokeWidth,
        bottom: strokeWidth,
        borderRadius: (size - strokeWidth * 2) / 2,
        backgroundColor: C.bgSurface,
      }} />
    </View>
  );
};
