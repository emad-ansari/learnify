import { Feather, FontAwesome6 } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'
import useCourseStore from '../store/useCourseStore'
import useBookmarkStore from '../store/useBookmarkStore'
import useEnrollmentStore from '../store/useEnrollmentStore'

export default function CourseDetailsScreen() {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()

  const { currentCourse: course, fetchCourseDetails, isLoading } = useCourseStore()
  const { isBookmarked, addBookmark, removeBookmark, fetchBookmarks } = useBookmarkStore()
  const { isEnrolled, enroll, fetchMyCourses } = useEnrollmentStore()

  React.useEffect(() => {
    if (id) {
      fetchCourseDetails(id)
      fetchBookmarks()
      fetchMyCourses()
    }
  }, [id])

  const bookmarked = id ? isBookmarked(id) : false
  const enrolled = id ? isEnrolled(id) : false

  const toggleBookmark = async () => {
    if (!id) return
    if (bookmarked) {
      await removeBookmark(id)
    } else {
      await addBookmark(id)
    }
  }

  const handleEnroll = async () => {
    if (!id) return
    if (enrolled) {
      router.push('/my-courses')
      return
    }
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      await enroll(id)
    } catch (err) {
      // Error handled by store toast
    }
  }

  if (isLoading || !course) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-secondary">Loading course details...</Text>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        bounces={false}
      >
        {/* ── HERO IMAGE SECTION ── */}
        <View className="relative w-full h-[380px]">
          <Image
            source={{ uri: course.thumbnail }}
            className="w-full h-full"
            resizeMode="cover"
          />
          {/* Subtle gradient overlay for text readability at top */}
          <View className="absolute inset-0 bg-black/20" />

          {/* Floating Header Actions */}
          <View
            className="absolute w-full px-6 flex-row justify-between items-center z-50"
            style={{ top: Platform.OS === 'ios' ? 60 : 40 }}
          >
            {/* Back Button */}
            <Pressable
              onPress={() => router.back()}
              className="w-11 h-11 rounded-full bg-black/30 items-center justify-center backdrop-blur-md border border-white/20"
            >
              <Feather name="arrow-left" size={20} color="white" />
            </Pressable>

            {/* Bookmark Toggle */}
            <Pressable
              onPress={toggleBookmark}
              className={`w-11 h-11 rounded-full items-center justify-center backdrop-blur-md border border-white/20 ${
                bookmarked ? 'bg-primary' : 'bg-black/30'
              }`}
            >
              <FontAwesome6
                name="bookmark"
                size={18}
                color="white"
                solid={bookmarked}
              />
            </Pressable>
          </View>
        </View>

        {/* ── CONTENT SECTION ── */}
        <Animated.View
          entering={FadeInUp.delay(200).duration(600)}
          className="flex-1 bg-white rounded-t-[36px] -mt-10 pt-8 px-6"
          style={{ minHeight: 500 }}
        >
          {/* Category Badge */}
          <View className="self-start bg-primary-subtle px-3 py-1.5 rounded-full mb-4">
            <Text className="text-primary text-[12px] font-bold uppercase tracking-widest">
              {course.category}
            </Text>
          </View>

          {/* Title */}
          <Text className="text-[26px] font-bold text-[#1C3734] leading-[34px] mb-6">
            {course.title}
          </Text>

          {/* Instructor Row */}
          <View className="flex-row items-center justify-between mb-8 pb-6 border-b border-black/5">
            <View className="flex-row items-center gap-3">
              <View className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border border-black/5">
                {course.instructor_image ? (
                  <Image
                    source={{ uri: course.instructor_image }}
                    className="w-full h-full"
                  />
                ) : (
                  <View className="w-full h-full items-center justify-center bg-primary-subtle">
                    <Feather name="user" size={16} color="#229F92" />
                  </View>
                )}
              </View>
              <View>
                <Text className="text-[12px] font-medium text-foreground-muted mb-0.5">
                  Instructor
                </Text>
                <Text className="text-[15px] font-bold text-[#1C3734]">
                  {course.instructor}
                </Text>
              </View>
            </View>

            {/* Quick Stats Block */}
            <View className="items-end">
              <View className="flex-row items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-full mb-1">
                <FontAwesome6 name="star" size={12} color="#F59E0B" solid />
                <Text className="text-[14px] font-bold text-[#F59E0B]">
                  {course.rating}
                </Text>
              </View>
              <Text className="text-[11px] font-medium text-foreground-subtle">
                {course.reviews_count} Reviews
              </Text>
            </View>
          </View>

          {/* About Section */}
          <View className="mb-8">
            <Text className="text-[18px] font-bold text-[#1C3734] mb-3">
              About this course
            </Text>
            <Text className="text-[14px] font-normal text-foreground-muted leading-[24px]">
              {course.description}
              {'\n\n'}
              This comprehensive course is designed to take you from
              fundamentals to advanced concepts. You will learn through hands-on
              projects, expert guidance, and real-world examples that will
              elevate your skills to a professional level.
            </Text>
          </View>

          {/* Key Features Grid */}
          <View className="flex-row flex-wrap justify-between gap-y-4">
            <FeatureItem icon="clock" label="Duration" value="12h 30m" />
            <FeatureItem icon="video" label="Lessons" value="42 Video" />
            <FeatureItem icon="award" label="Certificate" value="Included" />
            <FeatureItem icon="users" label="Students" value="2.5k+" />
          </View>
        </Animated.View>
        {/* ── SEAMLESS FLOATING TAB BAR ── */}
        <View
          className="absolute bottom-0 w-full bg-white px-6 pb-6"
          pointerEvents="box-only"
        >
          {/* This View acts as the invisible backdrop to prevent content from sliding under the real tab bar */}
        </View>
      </ScrollView>

      {/* ── FIXED BOTTOM ACTION BAR ── */}
      <Animated.View
        entering={FadeInDown.delay(500).duration(500)}
        className="absolute bottom-0 w-full bg-white px-6 pb-8 pt-4 border-t border-black/5"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -10 },
          shadowOpacity: 0.05,
          shadowRadius: 20,
          elevation: 10,
        }}
      >
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-[12px] font-medium text-foreground-muted mb-0.5">
              Total Price
            </Text>
            <Text className="text-[26px] font-bold text-primary">
              {course.price}
            </Text>
          </View>
          <Pressable 
            onPress={handleEnroll}
            className={`px-10 h-[56px] rounded-full items-center justify-center shadow-lg ${enrolled ? 'bg-gray-100 border border-gray-200' : 'bg-primary shadow-primary/30'}`}
          >
            <Text className={`${enrolled ? 'text-gray-500' : 'text-white'} text-[16px] font-bold`}>
              {enrolled ? 'Go to Course' : 'Enroll Now'}
            </Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  )
}

// Simple helper component for features
const FeatureItem = ({
  icon,
  label,
  value,
}: {
  icon: any
  label: string
  value: string
}) => (
  <View className="w-[47%] flex-row items-center gap-3 bg-[#F4F6F6] p-3 rounded-2xl">
    <View className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm border border-black/5">
      <Feather name={icon} size={16} color="#229F92" />
    </View>
    <View>
      <Text className="text-[11px] font-medium text-foreground-subtle">
        {label}
      </Text>
      <Text className="text-[13px] font-bold text-[#1C3734] mt-0.5">
        {value}
      </Text>
    </View>
  </View>
)
