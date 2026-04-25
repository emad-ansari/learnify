import React from "react";
import { Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { C } from "../constants/theme";
import { CircularProgress } from "./CircularProgress";

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  progress: number;
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, value, label, progress, delay = 0 }) => (
  <Animated.View
    entering={FadeInDown.delay(delay).duration(500).springify().damping(16)}
    style={{
      flex: 1,
      backgroundColor: C.bgSurface,
      borderRadius: 20,
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      shadowColor: C.secondary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.07,
      shadowRadius: 12,
      elevation: 4,
    }}
  >
    <View>
      <View style={{ marginBottom: 6 }}>{icon}</View>
      <Text style={{ fontSize: 18, fontFamily: "Poppins_700Bold", color: C.fgStrong, letterSpacing: -0.3 }}>
        {value}
      </Text>
      <Text style={{ fontSize: 11, fontFamily: "Poppins_400Regular", color: C.fgMuted, marginTop: 1 }}>
        {label}
      </Text>
    </View>
    <CircularProgress progress={progress} delay={delay + 300} />
  </Animated.View>
);
