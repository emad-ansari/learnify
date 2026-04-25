import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { C } from "../constants/theme";

const { width: SW } = Dimensions.get("window");

export const FEATURED = [
  { id: "0", tag: "Featured",    title: "UI/UX Design Fundamentals", author: "By Sarah Jenkins", colors: [C.primary, C.primaryDark] as const },
  { id: "1", tag: "Trending",    title: "Machine Learning A–Z",      author: "By Raj Patel",    colors: ["#5B7FA6", "#3A5A80"] as const },
  { id: "2", tag: "New Launch",  title: "iOS App Development",       author: "By Kim Lee",      colors: ["#9B8EC4", "#7B6AAD"] as const },
];

export const FeaturedCarousel = () => {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const cardWidth = SW - 40;

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % FEATURED.length;
        scrollRef.current?.scrollTo({ x: next * cardWidth, animated: true });
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Animated.View entering={FadeInDown.delay(350).duration(600).springify()}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          setActive(Math.round(e.nativeEvent.contentOffset.x / cardWidth));
        }}
        style={{ marginHorizontal: -20 }}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        snapToInterval={cardWidth + 0}
        decelerationRate="fast"
      >
        {FEATURED.map((item, i) => (
          <View key={item.id} style={{ width: cardWidth, marginRight: i < FEATURED.length - 1 ? 0 : 0 }}>
            <LinearGradient
              colors={item.colors}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={{ borderRadius: 24, padding: 24, minHeight: 170, overflow: "hidden" }}
            >
              {/* Decorative background shape */}
              <View style={{ position: "absolute", right: -10, top: -10, opacity: 0.18 }}>
                <Feather name="layers" color={C.white} size={130} />
              </View>

              <View style={{ alignSelf: "flex-start", backgroundColor: "rgba(255,255,255,0.22)",
                borderRadius: 99, paddingHorizontal: 12, paddingVertical: 4, marginBottom: 14 }}>
                <Text style={{ color: C.white, fontSize: 11, fontFamily: "Poppins_500Medium", letterSpacing: 0.5 }}>
                  {item.tag}
                </Text>
              </View>

              <Text style={{ fontSize: 22, fontFamily: "Poppins_700Bold", color: C.white,
                lineHeight: 30, maxWidth: "65%" }}>
                {item.title}
              </Text>
              <Text style={{ color: "rgba(255,255,255,0.75)", fontSize: 12,
                fontFamily: "Poppins_400Regular", marginTop: 4, marginBottom: 18 }}>
                {item.author}
              </Text>

              <Pressable style={{ alignSelf: "flex-start", backgroundColor: C.white,
                borderRadius: 50, paddingHorizontal: 20, paddingVertical: 10 }}>
                <Text style={{ color: item.colors[0], fontSize: 13,
                  fontFamily: "Poppins_600SemiBold" }}>
                  Enroll Now
                </Text>
              </Pressable>
            </LinearGradient>
          </View>
        ))}
      </ScrollView>

      {/* Dot indicators */}
      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 12, gap: 5 }}>
        {FEATURED.map((_, i) => (
          <Animated.View key={i} style={{
            width: active === i ? 20 : 6, height: 6,
            borderRadius: 3,
            backgroundColor: active === i ? C.primary : C.primaryMuted,
          }} />
        ))}
      </View>
    </Animated.View>
  );
};
