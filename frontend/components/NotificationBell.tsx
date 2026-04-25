import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";

export const NotificationBell = () => {
  const rotate = useSharedValue(0);
  useEffect(() => {
    rotate.value = withDelay(800,
      withRepeat(
        withSequence(
          withTiming(8, { duration: 100 }),
          withTiming(-8, { duration: 100 }),
          withTiming(5, { duration: 80 }),
          withTiming(-5, { duration: 80 }),
          withTiming(0, { duration: 100 }),
        ),
        2, false
      )
    );
  }, []);

  const style = useAnimatedStyle(() => ({ transform: [{ rotate: `${rotate.value}deg` }] }));

  return (
    <Animated.View style={style}>
      <View className="relative">
        <Feather name="bell" size={22} color="#2E5652" />
        <View className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#E05C7A] border-[1.5px] border-background" />
      </View>
    </Animated.View>
  );
};
