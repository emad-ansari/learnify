import React from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import Animated, { FadeInRight, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
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
      className="bg-white rounded-[20px] p-4 flex-row items-center mr-[14px] shadow-sm"
      style={[{ width: SW * 0.78, elevation: 4 }, cardStyle]}
    >
      <Pressable
        onPressIn={() => { scale.value = withSpring(0.97, { damping: 12 }); }}
        onPressOut={() => { scale.value = withSpring(1, { damping: 12 }); }}
        className="flex-row items-center flex-1"
      >
        {/* Icon bubble */}
        <View 
          className="w-[50px] h-[50px] rounded-[16px] items-center justify-center mr-3.5"
          style={{ backgroundColor: bg }}
        >
          <Feather name={icon as any} color={color} size={22} />
        </View>

        <View className="flex-1">
          <Text className="text-[14px] font-semibold text-foreground-strong mb-0.5" numberOfLines={1}>
            {title}
          </Text>
          <Text className="text-[11px] font-normal text-foreground-muted mb-1">
            {author}
          </Text>
          <View className="flex-row items-center gap-2">
            <View className="flex-1">
              <ProgressBar progress={progress} color={color} delay={delay + 300} />
            </View>
            <Text className="text-[11px] font-semibold" style={{ color: color }}>
              {Math.round(progress * 100)}%
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};
