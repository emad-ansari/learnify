import React, { useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { C } from "../constants/theme";

export const CATEGORIES = ["All", "Programming", "Design", "Data", "Business", "Creative"];

export const CategoryFilter = () => {
  const [selected, setSelected] = useState(0);

  return (
    <Animated.View entering={FadeInLeft.delay(500).duration(500)}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingVertical: 4 }}>
        {CATEGORIES.map((cat, i) => {
          const isActive = selected === i;
          return (
            <Pressable
              key={cat}
              onPress={() => setSelected(i)}
              style={{
                paddingHorizontal: 18, paddingVertical: 9,
                borderRadius: 50,
                backgroundColor: isActive ? C.primary : C.bgSurface,
                borderWidth: 1.5,
                borderColor: isActive ? C.primary : C.primaryMuted,
                shadowColor: isActive ? C.primary : "transparent",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: isActive ? 6 : 0,
              }}
            >
              <Text style={{
                fontSize: 13, fontFamily: "Poppins_500Medium",
                color: isActive ? C.white : C.secondaryLight,
              }}>
                {cat}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};
