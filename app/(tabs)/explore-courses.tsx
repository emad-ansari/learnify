/**
 * ExploreCoursesScreen.tsx — Learnify
 *
 * An ultra-minimalist, next-level explore experience.
 */

import { Feather } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
  Pressable,
  Platform,
} from 'react-native'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'

// Components
import { CategoryFilter } from '../../components/CategoryFilter'
import { CourseCard } from '../../components/CourseCard'

// Constants
import { POPULAR_COURSES } from '../../constants/data'

export default function ExploreCoursesScreen() {
  const [search, setSearch] = useState('')

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ── HEADER (Unified with background) ── */}
      <View 
        className="px-6 pt-10 pb-2 bg-white"
        style={{ paddingTop: Platform.OS === 'ios' ? 60 : 40 }}
      >
        <Animated.View entering={FadeInUp.duration(600).springify().damping(20)}>
          <Text className="text-[34px] font-bold text-[#1C3734] tracking-tight mb-6 mt-2">
            Explore
          </Text>

          {/* Minimalist Search Bar */}
          <View className="flex-row items-center bg-[#F4F6F6] rounded-full px-5 h-[52px]">
            <Feather name="search" size={20} color="#92A5A3" />
            <TextInput
              placeholder="Search courses, mentors..."
              placeholderTextColor="#92A5A3"
              className="flex-1 ml-3 text-[15px] font-medium text-[#1C3734]"
              value={search}
              onChangeText={setSearch}
            />
            {/* Filter Icon inside search bar for a cleaner look */}
            <Pressable className="pl-3 border-l border-black/5">
              <Feather name="sliders" size={18} color="#229F92" />
            </Pressable>
          </View>
        </Animated.View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* ── CATEGORIES ── */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(600)}
          className="pt-6 pb-2"
        >
          {/* We pad the scrollview content slightly differently to let pills bleed */}
          <View className="px-1">
            <CategoryFilter />
          </View>
        </Animated.View>

        {/* ── RESULTS ── */}
        <View className="px-4 mt-6">
          <View className="px-2 mb-5 flex-row justify-between items-end">
            <Text className="text-[13px] font-bold text-[#92A5A3] uppercase tracking-widest">
              Top Results
            </Text>
            <Pressable>
              <Text className="text-[13px] font-semibold text-[#229F92]">Filters</Text>
            </Pressable>
          </View>

          {/* Vertical List of Course Cards */}
          <View>
            {POPULAR_COURSES.map((course, i) => (
              <Animated.View 
                key={course.id} 
                entering={FadeInDown.delay(300 + (100 * i)).duration(600)}
              >
                <CourseCard 
                  {...course} 
                  delay={0} // Animation handled by the wrapper
                />
              </Animated.View>
            ))}
            
            {/* Repeated for visual density */}
            {POPULAR_COURSES.map((course, i) => (
              <Animated.View 
                key={course.id + "_2"} 
                entering={FadeInDown.delay(700 + (100 * i)).duration(600)}
              >
                <CourseCard 
                  {...course} 
                  delay={0}
                />
              </Animated.View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}