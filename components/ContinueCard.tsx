import React from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import Animated, { FadeInRight, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { C } from "../constants/theme";
import { ProgressBar } from "./ProgressBar";

const { width: SW } = Dimensions.get("window");

interface ContinueCardProps {
  icon: string;
  title: string;
  author: string;
  progress: number;
  color: string;
  bg: string;
  delay?: number;
}

export const ContinueCard: React.FC<ContinueCardProps> = ({ icon, title, author, progress, color, bg, delay = 0 }) => {
  const scale = useSharedValue(1);
  const cardStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View
      entering={FadeInRight.delay(delay).duration(500).springify()}
      style={[{
        width: SW * 0.78,
        marginRight: 14,
        backgroundColor: C.bgSurface,
        borderRadius: 20,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: C.secondary,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.07,
        shadowRadius: 12,
        elevation: 4,
      }, cardStyle]}
    >
      <Pressable
        onPressIn={() => { scale.value = withSpring(0.97, { damping: 12 }); }}
        onPressOut={() => { scale.value = withSpring(1, { damping: 12 }); }}
        style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
      >
        {/* Icon bubble */}
        <View style={{ width: 50, height: 50, borderRadius: 16,
          backgroundColor: bg, alignItems: "center", justifyContent: "center", marginRight: 14 }}>
          <Feather name={icon as any} color={color} size={22} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, fontFamily: "Poppins_600SemiBold",
            color: C.fgStrong, marginBottom: 2 }} numberOfLines={1}>
            {title}
          </Text>
          <Text style={{ fontSize: 11, fontFamily: "Poppins_400Regular",
            color: C.fgMuted, marginBottom: 4 }}>
            {author}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View style={{ flex: 1 }}>
              <ProgressBar progress={progress} color={color} delay={delay + 300} />
            </View>
            <Text style={{ fontSize: 11, fontFamily: "Poppins_600SemiBold", color: color }}>
              {Math.round(progress * 100)}%
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};
