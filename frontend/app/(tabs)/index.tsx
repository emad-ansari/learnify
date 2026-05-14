import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import {
  Dimensions,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

// Constants
import { CONTINUE_COURSES } from '../../constants/data'

// Components
import { CategoryFilter } from '../../components/CategoryFilter'
import { ContinueCard } from '../../components/ContinueCard'
import { CourseCard } from '../../components/CourseCard'
import { FeaturedCarousel } from '../../components/FeaturedCarousel'
import { NotificationBell } from '../../components/NotificationBell'
import { SectionHeader } from '../../components/SectionHeader'

import useAuthStore from '../../store/useAuthStore'
import useCourseStore from '../../store/useCourseStore'
import useEnrollmentStore from '@/store/useEnrollmentStore'

export default function HomeScreen() {
  const user = useAuthStore((state) => state.user)
  const {
    featuredCourses,
    popularCourses,
    fetchFeatured,
    fetchPopular,
    isLoading: isCoursesLoading,
  } = useCourseStore()
  const {
    myCourses,
    fetchMyCourses,
    isLoading: isEnrollmentLoading,
  } = useEnrollmentStore()
  const { isAuthenticated } = useAuthStore()

  const [refreshing, setRefreshing] = React.useState(false)

  const loadData = async () => {
    try {
      await Promise.all([
        fetchFeatured(),
        fetchPopular(),
        isAuthenticated ? fetchMyCourses() : Promise.resolve(),
      ])
    } catch (error) {
      console.error('Error loading home data:', error)
    }
  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    await loadData()
    setRefreshing(false)
  }, [isAuthenticated])

  React.useEffect(() => {
    loadData()
  }, [isAuthenticated])

  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" backgroundColor="#F4FAFA" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#229F92']}
          />
        }
      >
        {/* ── TOP GRADIENT BAND ── */}
        <LinearGradient
          colors={['#84D0C955', '#F4FAFA']}
          locations={[0, 0.6]}
          style={{
            paddingTop: Platform.OS === 'ios' ? 56 : 36,
            paddingHorizontal: 20,
            paddingBottom: 8,
          }}
        >
          {/* Header */}
          <Animated.View
            entering={FadeInDown.delay(0).duration(500)}
            className="flex-row items-center mb-[22px]"
          >
            <View className="flex-1">
              <Text className="text-[12px] font-normal text-foreground-muted">
                Good Morning 👋
              </Text>
              <Text className="text-[17px] font-bold text-foreground-strong tracking-tight">
                {user?.name || 'Guest'}
              </Text>
            </View>

            <View className="flex-row items-center gap-3">
              <NotificationBell />
              {/* Avatar */}
              <View className='p-0.5 rounded-full bg-gray-100'>
                <View className="w-11 h-11 rounded-full  flex items-center justify-center overflow-hidden bg-primary-subtle">
                  <Image
                    source={
                      user?.avatar
                        ? { uri: user.avatar }
                        : require('@/assets/images/avatar.png')
                    }
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Stat cards */}
          {/* <View className="flex-row gap-3 mb-[22px]">
            <Animated.View
              entering={FadeInDown.delay(100).duration(500)}
              className="flex-1 bg-white rounded-[24px] p-4 items-start border border-black/5 shadow-sm"
              style={{ elevation: 3 }}
            >
              
              <View className="w-[42px] h-[42px] rounded-[14px] bg-primary-subtle items-center justify-center mb-3">
                <Feather name="book-open" size={20} color="#229F92" />
              </View>

              <View>
                <Text className="text-[18px] font-bold text-foreground-strong tracking-tight">
                  14 Courses
                </Text>
                <Text className="text-[12px] font-normal text-foreground-subtle mt-0.5">
                  Enrolled
                </Text>
              </View>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(100).duration(500)}
              className="flex-1 bg-white rounded-[24px] p-4 items-start border border-black/5 shadow-sm"
              style={{ elevation: 3 }}
            >
              
              <View className="w-[42px] h-[42px] rounded-[14px] bg-primary-subtle items-center justify-center mb-3">
                <Feather name="clock" size={20} color="#229F92" />
              </View>

              <View>
                <Text className="text-[18px] font-bold text-foreground-strong tracking-tight">
                  88h 31m
                </Text>
                <Text className="text-[12px] font-normal text-foreground-subtle mt-0.5">
                  Total time
                </Text>
              </View>
            </Animated.View>
          </View> */}

          {/* Featured carousel */}
          <FeaturedCarousel data={featuredCourses} />
        </LinearGradient>

        {/* ── BODY ── */}
        <View className="px-5 mt-7">
          {/* Categories */}
          <SectionHeader title="Categories" delay={450} />
          <CategoryFilter />

          {/* Popular Courses */}
          <View className="mt-7">
            <SectionHeader title="Popular Courses" delay={500} />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 12 }}
              snapToInterval={Dimensions.get('window').width * 0.72 + 8} // 8 is margin
              decelerationRate="fast"
            >
              {popularCourses.map((course, i) => (
                <CourseCard
                  key={course.id}
                  {...course}
                  width={Dimensions.get('window').width * 0.72}
                  delay={560 + i * 100}
                />
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Continue Learning */}
        <View className="mt-7">
          <View className="px-5">
            <SectionHeader title="Continue Learning" delay={700} />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 4 }}
          >
            {myCourses.map((course, i) => (
              <ContinueCard key={course.id} {...course} delay={750 + i * 80} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  )
}
