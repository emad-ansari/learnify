import { Feather } from '@expo/vector-icons'
import { memo } from 'react'
import { View, Text, Platform, TextInput, Pressable } from 'react-native'
import { CategoryFilter } from './CategoryFilter'

interface ExploreHeaderProps {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  category: string
  setCategory: React.Dispatch<React.SetStateAction<string>>
  coursesCount: number
  isLoading: boolean
}

const ExploreHeader: React.FC<ExploreHeaderProps> = ({
  search,
  setSearch,
  category,
  setCategory,
  coursesCount,
  isLoading,
}) => {

  return (
    <View>
      {/* ── HEADER ── */}
      <View
        className="px-6 pt-10 pb-2 bg-white"
        style={{ paddingTop: Platform.OS === 'ios' ? 60 : 40 }}
      >
        <View>
          <Text className="text-[34px] font-bold text-[#1C3734] tracking-tight mb-6 mt-2">
            Explore
          </Text>

          {/* Minimalist Search Bar */}
          <View className="flex-row items-center bg-[#F4F6F6] rounded-full px-5 h-[52px] border border-transparent focus:border-primary/20">
            <Feather name="search" size={20} color="#92A5A3" />
            <TextInput
              placeholder="Search courses, mentors..."
              placeholderTextColor="#92A5A3"
              className="flex-1 ml-3 text-[15px] font-medium text-[#1C3734]"
              value={search}
              onChangeText={setSearch}
              returnKeyType="search"
            />
            {search.length > 0 && (
              <Pressable onPress={() => setSearch('')} className="p-1 bg-gray-200 rounded-full">
                <Feather name="x" size={16} color="#92A5A3" />
              </Pressable>
            )}
          </View>
        </View>
      </View>

      {/* ── CATEGORIES ── */}
      <View
        className="pt-6 pb-2"
      >
        <View className="px-5">
          <CategoryFilter selectedCategory={category} onSelect={setCategory} />
        </View>
      </View>

      {/* ── RESULTS HEADER ── */}
      <View className="px-6 mt-6 mb-5 flex-row justify-between items-end">
        <Text className="text-[13px] font-bold text-[#92A5A3] uppercase tracking-widest">
          {isLoading && search ? 'Searching...' : 'Top Results'}
        </Text>
        <Text className="text-[12px] font-medium text-foreground-muted">
          {coursesCount} found
        </Text>
      </View>
    </View>
  )
}

export default memo(ExploreHeader)
