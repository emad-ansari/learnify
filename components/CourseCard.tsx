import { Feather, FontAwesome6 } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { C } from '../constants/theme'

export interface CourseCardProps {
  category: string
  title: string
  instructor: string
  instructorAvatar?: string
  thumbnail: string
  rating: number
  reviews: string
  price: string
  description?: string
  width?: number
  delay?: number
}

export const CourseCard: React.FC<CourseCardProps & { id?: string }> = ({
  id,
  title,
  instructor,
  thumbnail,
  rating,
  price,
  description,
  width,
  delay = 0,
}) => {
  const router = useRouter();

  return (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(600)}
      className="m-2 rounded-[30px] bg-white shadow-sm border border-black/5 overflow-hidden"
      style={[{ elevation: 4, width: width }]}
    >
      <Pressable 
        className="flex-1"
        onPress={() => router.push({ pathname: '/course-details', params: { id: id || title } })}
      >
        {/* Thumbnail Area */}
        <View className="relative h-[170px] w-full">
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full"
            resizeMode="cover"
          />
          {/* Bookmark Button Overlay */}
          <Pressable
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 items-center justify-center"
            style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}
          >
            <Feather name="bookmark" size={20} color="white" />
          </Pressable>
        </View>

        {/* Content Area */}
        <View className="p-5 pt-4">
          {/* Title */}
          <Text
            className="text-[17px] font-bold text-[#1C3734] leading-[24px] mb-2"
            numberOfLines={2}
          >
            {title}
          </Text>

          {/* Instructor & Rating Row */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-[12px] font-medium text-foreground-muted">
              {instructor}
            </Text>
            <View className="flex-row items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full">
              <FontAwesome6 name="star" size={10} color="#F59E0B" solid />
              <Text className="text-[12px] font-bold text-[#F59E0B]">
                {rating}
              </Text>
            </View>
          </View>

          {/* Description (Optional) */}
          {description && (
            <Text
              className="text-[12px] font-normal text-foreground-muted leading-[18px] mb-5"
              numberOfLines={2}
            >
              {description}
            </Text>
          )}

          {/* Footer Row */}
          <View className="flex-row justify-between items-center mt-auto">
             <View>
               <Text className="text-[10px] font-bold text-foreground-subtle uppercase tracking-widest mb-1">Price</Text>
               <Text className="text-[18px] font-bold text-primary">{price}</Text>
            </View>
            <Pressable className="bg-primary px-5 py-2.5 rounded-full">
              <Text className="text-white text-[12px] font-bold">Enroll</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  )
}
