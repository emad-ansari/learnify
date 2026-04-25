import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";

const { width: SW } = Dimensions.get("window");

const FEATURED = [
  { id: "0", tag: "Featured",    title: "UI/UX Design Fundamentals", author: "By Sarah Jenkins", colors: ["#229F92", "#1A7E73"] as const },
  { id: "1", tag: "Trending",    title: "Machine Learning A–Z",      author: "By Raj Patel",    colors: ["#5B7FA6", "#3A5A80"] as const },
  { id: "2", tag: "New Launch",  title: "iOS App Development",       author: "By Kim Lee",      colors: ["#9B8EC4", "#7B6AAD"] as const },
];

export const FeaturedCarousel = () => {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  
  // Explicitly smaller width to ensure the next card is visible
  const cardWidth = SW * 0.80; 
  const gap = 16;
  const snapInterval = cardWidth + gap;

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % FEATURED.length;
        scrollRef.current?.scrollTo({ x: next * snapInterval, animated: true });
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [snapInterval]);

  return (
    <Animated.View entering={FadeInDown.delay(350).duration(600).springify()}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          setActive(Math.round(e.nativeEvent.contentOffset.x / snapInterval));
        }}
        className="-mx-5"
        contentContainerStyle={{ paddingHorizontal: 20 }}
        snapToInterval={snapInterval}
        decelerationRate="fast"
      >
        {FEATURED.map((item, i) => (
          <View 
            key={item.id} 
            style={{ width: cardWidth, marginRight: gap }}
          >
            <LinearGradient
              colors={item.colors}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              className="p-6 min-h-[180px] overflow-hidden"
              style={{ borderRadius: 24 }}
            >
              {/* Decorative background shape */}
              <View className="absolute -right-2.5 -top-2.5 opacity-20">
                <Feather name="layers" color="white" size={130} />
              </View>

              <View className="self-start bg-white/20 rounded-full px-3 py-1 mb-3.5">
                <Text className="text-white text-[11px] font-medium tracking-widest uppercase">
                  {item.tag}
                </Text>
              </View>

              <Text className="text-[22px] font-bold text-white leading-[30px] max-w-[80%]">
                {item.title}
              </Text>
              <Text className="text-white/75 text-[12px] font-normal mt-1.5 mb-[18px]">
                {item.author}
              </Text>

              <Pressable className="self-start bg-white rounded-full px-6 py-2.5">
                <Text 
                  className="text-[13px] font-semibold" 
                  style={{ color: item.colors[0] }}
                >
                  Enroll Now
                </Text>
              </Pressable>
            </LinearGradient>
          </View>
        ))}
      </ScrollView>

      {/* Dot indicators */}
      <View className="flex-row justify-center mt-4 gap-1.5">
        {FEATURED.map((_, i) => (
          <View 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-300 ${
              active === i ? "w-5 bg-primary" : "w-1.5 bg-primary-muted/40"
            }`} 
          />
        ))}
      </View>
    </Animated.View>
  );
};
