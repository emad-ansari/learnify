import React from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'

export const CATEGORIES = [
  'All',
  'Programming',
  'Design',
  'Data',
  'Business',
  'Creative',
]

interface CategoryFilterProps {
  selectedCategory: string
  onSelect: React.Dispatch<React.SetStateAction<string>>
}

export const CategoryFilter = ({
  selectedCategory,
  onSelect,
}: CategoryFilterProps) => {

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingVertical: 4 }}
      >
        {CATEGORIES.map((cat, i) => {
          const isActive = selectedCategory === cat
          return (
            <Pressable
              key={cat}
              onPress={() =>  onSelect(cat)}
              className={`px-[18px] py-[9px] rounded-full border-[1.5px] ${
                isActive
                  ? 'bg-primary border-primary shadow-lg shadow-primary/30'
                  : 'bg-white border-primary-muted'
              }`}
              style={{ elevation: isActive ? 6 : 0 }}
            >
              <Text
                className={`text-[13px] font-medium ${
                  isActive ? 'text-white' : 'text-secondary-light'
                }`}
              >
                {cat}
              </Text>
            </Pressable>
          )
        })}
      </ScrollView>
    </View>
  )
}
