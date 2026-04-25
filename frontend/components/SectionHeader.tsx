import React from "react";
import { Pressable, Text } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";

interface SectionHeaderProps {
  title: string;
  delay?: number;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, delay = 0 }) => (
  <Animated.View
    entering={FadeInLeft.delay(delay).duration(400)}
    className="flex-row justify-between items-center mb-3.5"
  >
    <Text className="text-[18px] font-bold text-foreground-strong tracking-tight">
      {title}
    </Text>
    <Pressable>
      <Text className="text-[13px] font-medium text-primary">See all</Text>
    </Pressable>
  </Animated.View>
);
