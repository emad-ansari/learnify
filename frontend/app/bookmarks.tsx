import { Feather, FontAwesome6 } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import useBookmarkStore from '../store/useBookmarkStore'

export default function BookmarksScreen() {
  const router = useRouter()
  const { bookmarks, fetchBookmarks, isLoading } = useBookmarkStore()

  React.useEffect(() => {
    fetchBookmarks()
  }, [])

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
          <Text className="text-[18px] font-bold text-foreground-strong">My Bookmarks</Text>
          <View className="w-10" /> 
        </View>
      </View>

      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-20">
            <View className="w-20 h-20 bg-primary-subtle rounded-full items-center justify-center mb-4">
              <Feather name="bookmark" size={32} color="#229F92" />
            </View>
            <Text className="text-[18px] font-bold text-foreground-strong mb-2">No bookmarks yet</Text>
            <Text className="text-[14px] text-foreground-muted text-center px-10">
              Start exploring courses and save your favorites to see them here.
            </Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <Animated.View 
            entering={FadeInDown.delay(index * 100).duration(500)}
            className="mb-4"
          >
            <Pressable 
              onPress={() => router.push({ pathname: '/course-details', params: { id: item.id } })}
              className="bg-white rounded-[24px] p-4 flex-row items-center gap-4 shadow-sm border border-black/5 active:bg-gray-50"
            >
              <View className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100">
                <Image source={{ uri: item.thumbnail }} className="w-full h-full" />
              </View>
              
              <View className="flex-1">
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="text-[11px] font-bold text-primary uppercase tracking-widest">
                    Course
                  </Text>
                  <TouchableOpacity 
                    onPress={(e) => {
                      e.stopPropagation();
                      useBookmarkStore.getState().removeBookmark(item.id);
                    }}
                  >
                    <FontAwesome6 name="bookmark" size={14} color="#229F92" solid />
                  </TouchableOpacity>
                </View>
                <Text className="text-[15px] font-bold text-foreground-strong mb-1" numberOfLines={1}>
                  {item.title}
                </Text>
                <View className="flex-row items-center gap-2">
                  <Text className="text-[14px] font-bold text-primary">
                    ${item.price}
                  </Text>
                </View>
              </View>
            </Pressable>
          </Animated.View>
        )}
      />
    </View>
  )
}
