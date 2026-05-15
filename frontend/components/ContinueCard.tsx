import React from 'react'
import { Dimensions, Image, Pressable, Text, View } from 'react-native'
import { EnrolledCourse } from '@/store/useEnrollmentStore'
import Animated, {
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { ProgressBar } from './ProgressBar'

const { width: SW } = Dimensions.get('window')

type ContinueCardProps = Omit<EnrolledCourse, 'id' | 'course_id'> & {
  delay?: number
}

export const ContinueCard: React.FC<ContinueCardProps> = ({
  course_title,
  course_author,
  progress,
  delay = 0,
  course_thumbnail,
}) => {
  const scale = useSharedValue(1)
  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <Animated.View
      entering={FadeInRight.delay(delay).duration(500).springify()}
      className="bg-white rounded-[20px] p-4 flex-row items-center mr-[14px] shadow-sm"
      style={[{ width: SW * 0.78, elevation: 4 }, cardStyle]}
    >
      <Pressable
        onPressIn={() => {
          scale.value = withSpring(0.97, { damping: 12 })
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 12 })
        }}
        className="flex-row items-center flex-1"
      >
        {/* Icon bubble */}
        <View className="w-[50px] h-[50px] rounded-[16px] items-center justify-center mr-3.5">
          <Image
            source={{ uri: course_thumbnail }}
            className="w-full h-full rounded-[16px]"
          />
        </View>

        <View className="flex-1">
          <Text
            className="text-[14px] font-semibold text-foreground-strong mb-0.5"
            numberOfLines={1}
          >
            {course_title}
          </Text>
          <Text className="text-[11px] font-normal text-foreground-muted mb-1">
            {course_author}
          </Text>
          <View className="flex-row items-center gap-2">
            <View className="flex-1">
              <ProgressBar
                progress={progress}
                color="#229F92"
                delay={delay + 300}
              />
            </View>
            <Text className="text-[11px] font-semibold text-primary">
              {Math.round(progress * 100)}%
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  )
}
