import React, { useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";

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
              className={`px-[18px] py-[9px] rounded-full border-[1.5px] ${
                isActive 
                  ? "bg-primary border-primary shadow-lg shadow-primary/30" 
                  : "bg-white border-primary-muted"
              }`}
              style={{ elevation: isActive ? 6 : 0 }}
            >
              <Text className={`text-[13px] font-medium ${
                isActive ? "text-white" : "text-secondary-light"
              }`}>
                {cat}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};
