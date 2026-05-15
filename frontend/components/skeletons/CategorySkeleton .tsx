import { Skeleton } from 'moti/skeleton'
import React from 'react'
import { ScrollView } from 'react-native'

export const CategorySkeleton = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 20,
        gap: 12,
      }}
    >
      {[1, 2, 3, 4].map((item) => (
        <Skeleton
          key={item}
          colorMode="light"
          width={100}
          height={40}
          radius={999}
        />
      ))}
    </ScrollView>
  )
}