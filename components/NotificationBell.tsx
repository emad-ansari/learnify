import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { C } from "../constants/theme";

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
      <View style={{ position: "relative" }}>
        <Feather name="bell" size={22} color={C.secondary} />
        <View style={{ position: "absolute", top: 0, right: 0,
          width: 8, height: 8, borderRadius: 4,
          backgroundColor: "#E05C7A",
          borderWidth: 1.5, borderColor: C.bgDefault }} />
      </View>
    </Animated.View>
  );
};
