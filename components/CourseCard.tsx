import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { C } from "../constants/theme";

export interface CourseCardProps {
  category: string;
  title: string;
  instructor: string;
  thumbnail: string;
  rating: number;
  reviews: string;
  price: string;
  delay?: number;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  category, title, instructor, thumbnail, rating, reviews, price, delay = 0,
}) => {
  const scale = useSharedValue(1);
  const cardStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(500).springify().damping(16)}
      style={[{ 
        flex: 1, 
        margin: 6, 
        borderRadius: 24, 
        backgroundColor: "#0A1A18", // Deep dark teal/black
        padding: 12,
        borderWidth: 1,
        borderColor: "#1A2E2A",
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 8 }, 
        shadowOpacity: 0.2,
        shadowRadius: 16, 
        elevation: 5 
      }, cardStyle]}
    >
      <Pressable
        onPressIn={() => { scale.value = withSpring(0.98, { damping: 12 }); }}
        onPressOut={() => { scale.value = withSpring(1, { damping: 12 }); }}
        style={{ flex: 1 }}
      >
        {/* Thumbnail Area */}
        <View style={{ height: 120, width: '100%', borderRadius: 18, overflow: 'hidden', marginBottom: 12 }}>
          <Image
            source={{ uri: thumbnail }}
            style={{ width: '100%', height: '100%' }}
            contentFit="cover"
            transition={300}
          />
        </View>

        {/* Content Area */}
        <View style={{ flex: 1 }}>
          {/* Rating Row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 6 }}>
            <FontAwesome6 name="star" size={10} color="#F59E0B" solid />
            <Text style={{ fontSize: 12, fontFamily: "Poppins_600SemiBold", color: "#FFFFFF" }}>
              {rating}
            </Text>
            <Text style={{ fontSize: 11, fontFamily: "Poppins_400Regular", color: "#92A5A3" }}>
              ({reviews})
            </Text>
          </View>

          {/* Title */}
          <Text 
            style={{ fontSize: 14, fontFamily: "Poppins_700Bold", color: "#FFFFFF", lineHeight: 20, marginBottom: 4 }} 
            numberOfLines={2}
          >
            {title}
          </Text>

          {/* Instructor (Optional but good) */}
          <Text style={{ fontSize: 11, fontFamily: "Poppins_400Regular", color: "#229F92", marginBottom: 12 }}>
            {instructor}
          </Text>

          {/* Footer Row */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
            <Text style={{ fontSize: 12, fontFamily: "Poppins_500Medium", color: "#92A5A3" }}>
              {category}
            </Text>
            <Text style={{ fontSize: 15, fontFamily: "Poppins_700Bold", color: "#F59E0B" }}>
              {price}
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};
