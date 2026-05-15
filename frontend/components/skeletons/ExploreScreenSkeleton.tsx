import { Skeleton } from 'moti/skeleton'
import React from 'react'
import { Dimensions, ScrollView, View } from 'react-native'

import { CategorySkeleton } from './CategorySkeleton '
import { CourseCardSkeleton } from './CourseCardSkeleton'

export const ExploreScreenSkeleton = () => {
  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Header */}
      <View className="px-6 pt-16">
        {/* Explore Title */}
        <Skeleton colorMode="light" width={180} height={42} radius={10} />

        {/* Search Bar */}
        <View className="mt-6">
          <Skeleton colorMode="light" width="100%" height={52} radius={999} />
        </View>
      </View>

      {/* Categories */}
      <View className="mt-6">
        <CategorySkeleton />
      </View>

      {/* Result Header */}
      <View className="px-6 mt-8 flex-row justify-between items-center">
        <Skeleton colorMode="light" width={110} height={16} radius={6} />

        <Skeleton colorMode="light" width={50} height={16} radius={6} />
      </View>

      {/* Cards */}
      <View className="mt-6 flex-col items-center justify-center gap-6">
        {[1, 2, 3].map((item) => (
          <CourseCardSkeleton
            key={item}
            width={Dimensions.get('window').width * 0.90}
          />
        ))}
      </View>
    </ScrollView>
  )
}
