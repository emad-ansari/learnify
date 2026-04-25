/**
 * HomeScreen.tsx — Learnify
 *
 * Refactored to use modular components.
 */

import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Platform, ScrollView, StatusBar, Text, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

// Constants
import { CONTINUE_COURSES, POPULAR_COURSES } from '../../constants/data'
import { C } from '../../constants/theme'

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
    <View style={{ flex: 1, backgroundColor: C.bgDefault }}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bgDefault} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* ── TOP GRADIENT BAND ── */}
        <LinearGradient
          colors={[C.primaryLight + '55', C.bgDefault]}
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
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 22,
            }}
          >
            {/* Logo mark */}
            <View
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                backgroundColor: C.primarySubtle,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
              }}
            >
              <Feather name="grid" size={22} color={C.primary} />
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Poppins_400Regular',
                  color: C.fgMuted,
                }}
              >
                Good Morning 👋
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: 'Poppins_700Bold',
                  color: C.fgStrong,
                  letterSpacing: -0.3,
                }}
              >
                Rahul Sharma
              </Text>
            </View>

            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
            >
              <NotificationBell />
              {/* Avatar */}
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: C.primaryMuted,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 2.5,
                  borderColor: C.primary,
                }}
              >
                <Text style={{ fontSize: 16 }}>🧑</Text>
              </View>
            </View>
          </Animated.View>

          {/* Stat cards */}
          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 22 }}>
            <StatCard
              icon={<Feather name="book-open" size={20} color={C.primary} />}
              value="14 Courses"
              label="Enrolled"
              progress={0.7}
              delay={100}
            />
            <StatCard
              icon={<Feather name="clock" size={20} color={C.primary} />}
              value="88h 31m"
              label="Total time"
              progress={0.55}
              delay={200}
            />
          </View>

          {/* Featured carousel */}
          <FeaturedCarousel />
        </LinearGradient>

        {/* ── BODY ── */}
        <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
          {/* Categories */}
          <SectionHeader title="Categories" delay={450} />
          <CategoryFilter />

          {/* Popular Courses */}
          <View style={{ marginTop: 28 }}>
            <SectionHeader title="Popular Courses" delay={500} />
            <View style={{ flexDirection: 'row', marginHorizontal: -5 }}>
              <View style={{ flex: 1 }}>
                <CourseCard {...POPULAR_COURSES[0]} delay={560} />
                <CourseCard {...POPULAR_COURSES[2]} delay={680} />
              </View>
              <View style={{ flex: 1 }}>
                <CourseCard {...POPULAR_COURSES[1]} delay={620} />
                <CourseCard {...POPULAR_COURSES[3]} delay={740} />
              </View>
            </View>
          </View>
        </View>

        {/* Continue Learning — bleeds edge-to-edge */}
        <View style={{ marginTop: 28 }}>
          <View style={{ paddingHorizontal: 20 }}>
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
