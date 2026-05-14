import { Feather, FontAwesome6 } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'
import useBookmarkStore from '../store/useBookmarkStore'
import useEnrollmentStore from '../store/useEnrollmentStore'
import { Course } from '../store/useCourseStore'

export interface CourseCardProps {
  category: string
  title: string
  instructor: string
  instructor_image?: string
  thumbnail: string
  rating: number
  price: number
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
  const router = useRouter()
  const { toggleBookmark, isBookmarked } = useBookmarkStore()
  const { enroll, isEnrolled } = useEnrollmentStore()
  
  const bookmarked = id ? isBookmarked(id) : false
  const enrolled = id ? isEnrolled(id) : false

  const handleBookmark = () => {
    if (id) {
      toggleBookmark({ id, title, instructor, thumbnail, rating, price, description } as Course)
    }
  }

  const handleEnroll = async () => {
    if (id && !enrolled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      await enroll(id)
    } else if (enrolled) {
      router.push('/my-courses')
    }
  }
  return (
    <View
      // entering={FadeInDown.delay(delay).duration(600)}
      className="m-2 rounded-[30px] bg-white shadow-sm border border-black/5 overflow-hidden"
      style={[{ elevation: 4, width: width || '100%' }]}
    >
      <Pressable
        onPress={() =>
          router.push({
            pathname: '/course-details',
            params: { id: id || title },
          })
        }
      >
        {/* Thumbnail Area */}
        <View className="relative h-[170px] w-full">
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full"
            resizeMode="cover"
          />
          {/* Bookmark Button Overlay */}
          <TouchableOpacity
            onPress={handleBookmark}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 items-center justify-center"
            style={{ borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}
          >
            <FontAwesome6 
              name="bookmark" 
              size={18} 
              color={bookmarked ? "#229F92" : "white"} 
              solid={bookmarked} 
            />
          </TouchableOpacity>
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
              <Text className="text-[10px] font-bold text-foreground-subtle uppercase tracking-widest mb-1">
                Price
              </Text>
              <Text className="text-[18px] font-bold text-primary">
                {price}
              </Text>
            </View>
            <TouchableOpacity 
              onPress={handleEnroll}
              className={`${enrolled ? 'bg-gray-200' : 'bg-primary'} px-5 py-2.5 rounded-full`}
            >
              <Text className={`${enrolled ? 'text-gray-500' : 'text-white'} text-[12px] font-bold`}>
                {enrolled ? 'In My Learning' : 'Enroll'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </View>
  )
}
