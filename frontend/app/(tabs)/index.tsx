import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

// Constants
import { CONTINUE_COURSES, POPULAR_COURSES } from '../../constants/data'

// Components
import { CategoryFilter } from '../../components/CategoryFilter'
import { ContinueCard } from '../../components/ContinueCard'
import { CourseCard } from '../../components/CourseCard'
import { FeaturedCarousel } from '../../components/FeaturedCarousel'
import { NotificationBell } from '../../components/NotificationBell'
import { StatCard } from '../../components/StatCard'
import { SectionHeader } from '../../components/SectionHeader'

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" backgroundColor="#F4FAFA" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }} // Space for floating tab bar
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
                Mohammad Emad
              </Text>
            </View>

            <View className="flex-row items-center gap-3">
              <NotificationBell />
              {/* Avatar */}
              <View className="w-11 h-11 rounded-full bg-primary-muted flex items-center justify-center overflow-hidden border-2 border-primary">
                <Image
                  source={require('@/assets/images/avatar.png')}
                  className="w-[95%] h-[95%]"
                  resizeMode="cover"
                />
              </View>
            </View>
          </Animated.View>

          {/* Stat cards */}
          <View className="flex-row gap-3 mb-[22px]">
            <StatCard
              icon={<Feather name="book-open" size={20} color="#229F92" />}
              value="14 Courses"
              label="Enrolled"
              delay={100}
            />
            <StatCard
              icon={<Feather name="clock" size={20} color="#229F92" />}
              value="88h 31m"
              label="Total time"
              delay={200}
            />
          </View>

          {/* Featured carousel */}
          <FeaturedCarousel />
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
              {POPULAR_COURSES.map((course, i) => (
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

        {/* Continue Learning — bleeds edge-to-edge */}
        <View className="mt-7">
          <View className="px-5">
            <SectionHeader title="Continue Learning" delay={700} />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 4 }}
          >
            {CONTINUE_COURSES.map((course, i) => (
              <ContinueCard key={course.id} {...course} delay={750 + i * 80} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  )
}
