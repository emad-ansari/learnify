import { Skeleton } from 'moti/skeleton'
import React from 'react'
import { View } from 'react-native'
interface CourseCardSkeletonProps {
  width?: number
}

interface CourseCardSkeletonProps {
  width?: number
}

export const CourseCardSkeleton = ({ width }: CourseCardSkeletonProps) => {
  return (
    <View
      className="mx-2 rounded-[30px] bg-white overflow-hidden border border-black/5"
      style={{
        width: width || 280,
      }}
    >
      {/* Thumbnail */}
      <Skeleton
        height={170}
        width={'100%'}
        radius={24}
        colorMode="light"
        backgroundColor="#E5E7EB"
      />

      <View className="p-5">
        <Skeleton
          height={24}
          width={'80%'}
          radius={8}
          colorMode="light"
          backgroundColor="#E5E7EB"
        />

        <View className="mt-4">
          <Skeleton
            height={14}
            width={120}
            radius={6}
            colorMode="light"
            backgroundColor="#E5E7EB"
          />
        </View>

        <View className="mt-5">
          <Skeleton
            height={12}
            width={'100%'}
            radius={6}
            colorMode="light"
            backgroundColor="#E5E7EB"
          />
          <View className="mt-2">
            <Skeleton
              height={12}
              width={'90%'}
              radius={6}
              colorMode="light"
              backgroundColor="#E5E7EB"
            />
          </View>
        </View>

        <View className="flex-row justify-between items-center mt-6">
          <View>
            <Skeleton
              height={10}
              width={50}
              radius={6}
              colorMode="light"
              backgroundColor="#E5E7EB"
            />
            <View className="mt-2">
              <Skeleton
                height={24}
                width={70}
                radius={8}
                colorMode="light"
                backgroundColor="#E5E7EB"
              />
            </View>
          </View>

          <Skeleton
            height={42}
            width={110}
            radius={999}
            colorMode="light"
            backgroundColor="#E5E7EB"
          />
        </View>
      </View>
    </View>
  )
}
