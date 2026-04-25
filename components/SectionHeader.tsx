import React from "react";
import { Pressable, Text } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { C } from "../constants/theme";

interface SectionHeaderProps {
  title: string;
  delay?: number;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, delay = 0 }) => (
  <Animated.View
    entering={FadeInLeft.delay(delay).duration(400)}
    style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}
  >
    <Text style={{ fontSize: 18, fontFamily: "Poppins_700Bold", color: C.fgStrong, letterSpacing: -0.3 }}>
      {title}
    </Text>
    <Pressable>
      <Text style={{ fontSize: 13, fontFamily: "Poppins_500Medium", color: C.primary }}>See all</Text>
    </Pressable>
  </Animated.View>
);
