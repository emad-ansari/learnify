import { Feather } from '@expo/vector-icons'
import React, { useState, useEffect, memo, useCallback } from 'react'
import { useDebounce } from 'use-debounce'
import { FlatList, RefreshControl, StatusBar, Text, View } from 'react-native'
import { CourseCardSkeleton } from '@/components/skeletons/CourseCardSkeleton'
import { CourseCard } from '@/components/CourseCard'
import useCourseStore, { Course } from '@/store/useCourseStore'
import ExploreHeader from '@/components/ExploreHeader'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { ExploreScreenSkeleton } from '@/components/skeletons/ExploreScreenSkeleton'

const CourseItem = memo(({ item, index }: { item: Course; index: number }) => (
  <View className="px-4">
    <CourseCard {...item} delay={index < 6 ? 100 + 50 * index : 0} />
  </View>
))

export default function ExploreCoursesScreen() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [refreshing, setRefreshing] = useState(false)
  const { courses, fetchCourses, isLoading, initialLoading } = useCourseStore()

  const [debouncedSearch] = useDebounce(search, 500)

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchCourses({
      search: debouncedSearch,
      category: category === 'All' ? undefined : category,
    })
    setRefreshing(false)
  }

  useEffect(() => {
    fetchCourses({
      search: debouncedSearch,
      category: category === 'All' ? undefined : category,
    })
  }, [debouncedSearch, category])

  const renderItem = useCallback(
    ({ item, index }: { item: Course; index: number }) => (
      <CourseItem item={item} index={index} />
    ),
    [],
  )

  if (initialLoading) {
    return <ExploreScreenSkeleton />
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        maxToRenderPerBatch={10}
        windowSize={5}
        ListHeaderComponent={
          <ExploreHeader
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            coursesCount={courses.length}
            isLoading={isLoading}
          />
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          !isLoading ? (
            <Animated.View
              entering={FadeInDown}
              className="items-center mt-20 px-10"
            >
              <View className="w-20 h-20 bg-gray-50 rounded-full items-center justify-center mb-4">
                <Feather name="search" size={32} color="#92A5A3" />
              </View>
              <Text className="text-[16px] font-bold text-foreground-strong mb-2">
                No Results Found
              </Text>
              <Text className="text-center text-foreground-muted">
                We couldn't find any courses matching "{search}". Try a
                different keyword or category.
              </Text>
            </Animated.View>
          ) : null
        }
        renderItem={renderItem}
      />
    </View>
  )
}
