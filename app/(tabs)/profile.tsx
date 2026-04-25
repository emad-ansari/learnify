/**
 * profile.tsx — Learnify
 *
 * A clean, minimalist, senior-designer level profile screen.
 * perfectly matched with the app's color theme.
 */

import { Feather } from '@expo/vector-icons'
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

export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        bounces={false}
      >
        {/* ── HEADER CARD ── */}
        <View 
          className="bg-white rounded-b-[40px] px-6 pt-10 pb-8 items-center shadow-sm border-b border-black/5"
          style={{ paddingTop: Platform.OS === 'ios' ? 80 : 60, elevation: 2 }}
        >
          <Animated.View entering={FadeInDown.duration(600).springify().damping(20)} className="items-center w-full">
            {/* Avatar Container with Edit Button */}
            <View className="relative w-[110px] h-[110px] mb-5">
              <View className="w-full h-full rounded-full overflow-hidden bg-primary-subtle border-4 border-white shadow-sm">
                <Image
                  source={require('@/assets/images/avatar.png')}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              {/* Profile Picture Update Button */}
              <Pressable 
                className="absolute bottom-0 right-0 w-9 h-9 bg-primary rounded-full items-center justify-center border-4 border-white shadow-sm"
              >
                <Feather name="camera" size={14} color="white" />
              </Pressable>
            </View>

            {/* User Info */}
            <Text className="text-[24px] font-bold text-foreground-strong mb-1">
              Mohammad Emad
            </Text>
            <Text className="text-[14px] font-medium text-foreground-muted">
              mohammad.emad@example.com
            </Text>

            {/* Quick Stats Dashboard (Integrated into header for cleaner look) */}
            <View className="w-full flex-row justify-between bg-background p-5 rounded-[24px] mt-8">
              <StatColumn icon="book-open" value="14" label="Enrolled" />
              <View className="w-[1px] bg-black/5 mx-2" />
              <StatColumn icon="check-circle" value="4" label="Completed" />
              <View className="w-[1px] bg-black/5 mx-2" />
              <StatColumn icon="clock" value="88h" label="Total Time" />
            </View>
          </Animated.View>
        </View>

        {/* ── CURRENT PROGRESS SECTION ── */}
        <Animated.View 
          entering={FadeInUp.delay(200).duration(600)}
          className="px-6 mt-8 mb-8"
        >
          <Text className="text-[14px] font-bold text-foreground-muted uppercase tracking-widest mb-4 ml-2">
            Current Progress
          </Text>
          
          <View className="bg-white rounded-[24px] p-5 shadow-sm border border-black/5">
            <View className="flex-row items-center gap-4 mb-4">
              <View className="w-12 h-12 rounded-xl bg-primary-subtle items-center justify-center">
                <Feather name="layout" size={20} color="#229F92" />
              </View>
              <View className="flex-1">
                <Text className="text-[15px] font-bold text-foreground-strong">Advanced UI/UX Design</Text>
                <Text className="text-[12px] font-medium text-foreground-muted mt-1">12 of 24 Lessons</Text>
              </View>
              <Text className="text-[16px] font-bold text-primary">50%</Text>
            </View>
            {/* Progress Bar */}
            <View className="h-2 w-full bg-background rounded-full overflow-hidden">
              <View className="h-full bg-primary w-[50%] rounded-full" />
            </View>
          </View>
        </Animated.View>

        {/* ── SETTINGS MENU ── */}
        <View className="px-6">
          <Text className="text-[14px] font-bold text-foreground-muted uppercase tracking-widest mb-4 ml-2">
            General Settings
          </Text>
          
          <View className="bg-white rounded-[24px] border border-black/5 shadow-sm overflow-hidden mb-8">
            <MenuItem icon="user" label="Personal Information" delay={300} />
            <MenuItem icon="credit-card" label="Payment Methods" delay={400} />
            <MenuItem icon="award" label="My Certificates" delay={500} />
            <MenuItem icon="bell" label="Notifications" delay={600} isLast />
          </View>

          <Text className="text-[14px] font-bold text-foreground-muted uppercase tracking-widest mb-4 ml-2">
            Preferences
          </Text>

          <View className="bg-white rounded-[24px] border border-black/5 shadow-sm overflow-hidden mb-10">
            <MenuItem icon="shield" label="Privacy & Security" delay={700} />
            <MenuItem icon="help-circle" label="Help & Support" delay={800} isLast />
          </View>

          {/* ── LOG OUT BUTTON ── */}
          <Animated.View entering={FadeInUp.delay(900).duration(500)}>
            <Pressable 
              className="h-14 rounded-full border-2 border-red-100 bg-red-50 items-center justify-center flex-row gap-2 active:bg-red-100"
            >
              <Feather name="log-out" size={18} color="#EF4444" />
              <Text className="text-[16px] font-bold text-red-500">Log Out Securely</Text>
            </Pressable>
          </Animated.View>

        </View>
      </ScrollView>
    </View>
  )
}

// ── HELPER COMPONENTS ──

const StatColumn = ({ icon, value, label }: { icon: any, value: string, label: string }) => (
  <View className="items-center flex-1">
    <View className="w-10 h-10 rounded-full bg-white items-center justify-center mb-2 shadow-sm border border-black/5">
      <Feather name={icon} size={16} color="#229F92" />
    </View>
    <Text className="text-[18px] font-bold text-foreground-strong mb-0.5">{value}</Text>
    <Text className="text-[11px] font-medium text-foreground-subtle">{label}</Text>
  </View>
)

const MenuItem = ({ icon, label, delay, isLast = false }: { icon: any, label: string, delay: number, isLast?: boolean }) => (
  <Animated.View entering={FadeInUp.delay(delay).duration(500)}>
    <Pressable className={`flex-row items-center justify-between p-5 bg-white active:bg-background ${!isLast ? 'border-b border-black/5' : ''}`}>
      <View className="flex-row items-center gap-4">
        <View className="w-10 h-10 rounded-full bg-background items-center justify-center">
          <Feather name={icon} size={18} color="#1C3734" />
        </View>
        <Text className="text-[16px] font-bold text-foreground-strong">{label}</Text>
      </View>
      <Feather name="chevron-right" size={20} color="#92A5A3" />
    </Pressable>
  </Animated.View>
)
