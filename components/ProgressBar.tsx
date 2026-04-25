import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

interface ProgressBarProps {
  progress: number;
  color?: string;
  delay?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = "#229F92",
  delay = 0,
}) => {
  const width = useSharedValue(0);
  useEffect(() => {
    width.value = withDelay(delay, withSpring(progress, { damping: 18, stiffness: 80 }));
  }, [progress, delay]);
  const style = useAnimatedStyle(() => ({ width: `${width.value * 100}%` as any }));

  return (
    <View 
      className="h-[5px] rounded-full overflow-hidden my-2" 
      style={{ backgroundColor: `${color}25` }}
    >
      <Animated.View 
        className="h-full rounded-full" 
        style={[{ backgroundColor: color }, style]} 
      />
    </View>
  );
};
