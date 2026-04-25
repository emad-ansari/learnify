import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { C } from "../constants/theme";

interface ProgressBarProps {
  progress: number;
  color?: string;
  delay?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = C.primary,
  delay = 0,
}) => {
  const width = useSharedValue(0);
  useEffect(() => {
    width.value = withDelay(delay, withSpring(progress, { damping: 18, stiffness: 80 }));
  }, [progress, delay]);
  const style = useAnimatedStyle(() => ({ width: `${width.value * 100}%` as any }));

  return (
    <View style={{ height: 5, backgroundColor: `${color}25`, borderRadius: 99, overflow: "hidden", marginVertical: 8 }}>
      <Animated.View style={[{ height: "100%", backgroundColor: color, borderRadius: 99 }, style]} />
    </View>
  );
};
