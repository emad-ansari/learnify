import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  StatusBar,
  Text,
  View,
} from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

import { CONTINUE_COURSES } from '../constants/data'

export default function MyCoursesScreen() {
  const router = useRouter()

  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFA" />

      {/* ── HEADER ── */}
      <View 
        className="px-6 pb-6 bg-background"
        style={{ paddingTop: Platform.OS === 'ios' ? 60 : 40 }}
      >
        <View className="flex-row items-center justify-between mb-2">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm border border-black/5"
          >
            <Feather name="arrow-left" size={20} color="#1C3734" />
          </Pressable>
          <Text className="text-[18px] font-bold text-foreground-strong">My Courses</Text>
          <View className="w-10" /> 
        </View>
      </View>

      <FlatList
        data={CONTINUE_COURSES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="mb-6">
            <Text className="text-[22px] font-bold text-foreground-strong">Keep Learning</Text>
            <Text className="text-[14px] text-foreground-muted mt-1">  {`You have ${CONTINUE_COURSES.length} courses in progress`}</Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <Animated.View 
            entering={FadeInDown.delay(index * 100).duration(500)}
            className="mb-4"
          >
            <Pressable 
              className="bg-white rounded-[24px] p-5 shadow-sm border border-black/5 active:bg-gray-50"
            >
              <View className="flex-row items-center gap-4 mb-4">
                <View className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-100">
                  <Image 
                    source={{ uri: item.thumbnail }} 
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-[16px] font-bold text-foreground-strong mb-0.5">{item.title}</Text>
                  <Text className="text-[12px] font-medium text-foreground-muted">{item.author}</Text>
                </View>
              </View>

              {/* Progress Section */}
              <View>
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-[12px] font-bold text-foreground-subtle">Course Progress</Text>
                  <Text className="text-[12px] font-bold text-primary">{Math.round(item.progress * 100)}%</Text>
                </View>
                <View className="h-2 w-full bg-background rounded-full overflow-hidden">
                  <Animated.View 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${item.progress * 100}%` }}
                  />
                </View>
              </View>

              <Pressable 
                className="mt-5 h-11 bg-primary-subtle rounded-xl items-center justify-center border border-primary/10"
              >
                <Text className="text-primary font-bold text-[14px]">Continue Lesson</Text>
              </Pressable>
            </Pressable>
          </Animated.View>
        )}
      />
    </View>
  )
}
