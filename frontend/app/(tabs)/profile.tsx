import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import useAuthStore from '@/store/useAuthStore'
import useEnrollmentStore from '@/store/useEnrollmentStore'
import useProfileStore from '@/store/useProfileStore'
import * as ImagePicker from 'expo-image-picker'
import React from 'react'
import Toast from 'react-native-toast-message'
import { apiFetch } from '@/api/apiConfig'
import {
  Alert,
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
  const router = useRouter()
  const { logout, user, updateUser } = useAuthStore()
  const { myCourses, fetchMyCourses } = useEnrollmentStore()
  const { stats, fetchStats } = useProfileStore()
  const [refreshing, setRefreshing] = React.useState(false)
  const [isUploading, setIsUploading] = React.useState(false)

  // Cloudinary Config from environment variables
  const CLOUDINARY_URL = process.env.EXPO_PUBLIC_CLOUDINARY_URL || ''
  const UPLOAD_PRESET = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ''

  React.useEffect(() => {
    fetchMyCourses()
    fetchStats()
  }, [])

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    })

    if (!result.canceled) {
      uploadImage(result.assets[0].uri)
    }
  }

  const uploadImage = async (uri: string) => {
    setIsUploading(true)

    Toast.show({
      type: 'info',
      text1: 'Uploading...',
      text2: 'Saving your profile picture',
    })

    try {
      // 1. Create FormData
      const formData = new FormData()
      formData.append('file', {
        uri,
        type: 'image/jpeg',
        name: 'profile.jpg',
      } as any)
      formData.append('upload_preset', UPLOAD_PRESET)

      // 2. Upload to Cloudinary
      const response = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!data.secure_url) throw new Error('Upload failed')

      // 3. Save to Backend
      await apiFetch('/profile/avatar', {
        method: 'PATCH',
        body: { avatarUrl: data.secure_url },
      })

      // 4. Update Local Store
      updateUser({ avatar: data.secure_url })

      Toast.show({
        type: 'success',
        text1: 'Success!',
        text2: 'Profile picture updated',
      })
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'Failed to upload image',
      })
    } finally {
      setIsUploading(false)
    }
  }

  // Find the course with the highest progress that isn't finished
  const currentLearning =
    [...myCourses]
      .filter((c) => c.progress < 1)
      .sort((a, b) => b.progress - a.progress)[0] || myCourses[0]

  const totalTimeHours = stats ? Math.floor(stats.totalTimeSpent / 60) : 0

  const handleLogout = () => {
    logout()
    router.replace('/(auth)/signin')
  }
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
          <Animated.View
            entering={FadeInDown.duration(600)}
            className="items-center w-full"
          >
            {/* Avatar Container with Edit Button */}
            <View className="relative w-[110px] h-[110px] mb-5">
              <View className="w-full h-full rounded-full overflow-hidden bg-primary-subtle border-4 border-white shadow-sm">
                <Image
                  source={
                    user?.avatar
                      ? { uri: user.avatar }
                      : require('@/assets/images/avatar.png')
                  }
                  className="w-full h-full"
                  resizeMode="cover"
                />
                {isUploading && (
                  <View className="absolute inset-0 bg-black/40 items-center justify-center">
                    <Text className="text-white text-[10px] font-bold">
                      ...
                    </Text>
                  </View>
                )}
              </View>
              {/* Profile Picture Update Button */}
              <Pressable
                onPress={pickImage}
                disabled={isUploading}
                className="absolute bottom-0 right-0 w-9 h-9 bg-primary rounded-full items-center justify-center border-4 border-white shadow-sm"
              >
                <Feather name="camera" size={14} color="white" />
              </Pressable>
            </View>

            {/* User Info */}
            <Text className="text-[24px] font-bold text-foreground-strong mb-1">
              {user?.name || 'User'}
            </Text>
            <Text className="text-[14px] font-medium text-foreground-muted">
              {user?.email || 'email@example.com'}
            </Text>

            {/* Quick Stats Dashboard (Integrated into header for cleaner look) */}
            <View className="w-full flex-row justify-between bg-background p-5 rounded-[24px] mt-8">
              <StatColumn
                icon="book-open"
                value={
                  stats?.totalEnrolled.toString() || myCourses.length.toString()
                }
                label="Enrolled"
                onPress={() => router.push('/my-courses')}
              />
              <View className="w-[1px] bg-black/5 mx-2" />
              <StatColumn
                icon="check-circle"
                value={stats?.completedCourses.toString() || '0'}
                label="Completed"
              />
              <View className="w-[1px] bg-black/5 mx-2" />
              <StatColumn
                icon="clock"
                value={`${totalTimeHours}h`}
                label="Total Time"
              />
            </View>
          </Animated.View>
        </View>

        {/* ── CURRENT PROGRESS SECTION ── */}
        {currentLearning && (
          <Animated.View
            entering={FadeInUp.delay(200).duration(600)}
            className="px-6 mt-8 mb-8"
          >
            <Text className="text-[14px] font-bold text-foreground-muted uppercase tracking-widest mb-4 ml-2">
              Current Progress
            </Text>

            <Pressable
              onPress={() =>
                router.push({
                  pathname: '/course-details',
                  params: { id: currentLearning.course_id },
                })
              }
              className="bg-white rounded-[24px] p-5 shadow-sm border border-black/5 active:bg-gray-50"
            >
              <View className="flex-row items-center gap-4 mb-4">
                <View className="w-12 h-12 rounded-xl bg-primary-subtle items-center justify-center">
                  <Feather name="layout" size={20} color="#229F92" />
                </View>
                <View className="flex-1">
                  <Text className="text-[15px] font-bold text-foreground-strong">
                    {currentLearning.course_title}
                  </Text>
                  <Text className="text-[12px] font-medium text-foreground-muted mt-1">
                    Keep going with your learning!
                  </Text>
                </View>
                <Text className="text-[16px] font-bold text-primary">
                  {Math.round(currentLearning.progress * 100)}%
                </Text>
              </View>
              {/* Progress Bar */}
              <View className="h-2 w-full bg-background rounded-full overflow-hidden">
                <View
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${currentLearning.progress * 100}%` }}
                />
              </View>
            </Pressable>
          </Animated.View>
        )}

        {/* ── SETTINGS MENU ── */}
        <View className="px-6">
          <Text className="text-[14px] font-bold text-foreground-muted uppercase tracking-widest mb-4 ml-2">
            General Settings
          </Text>

          <View className="bg-white rounded-[24px] border border-black/5 shadow-sm overflow-hidden mb-8">
            <MenuItem
              icon="book"
              label="My Enrolled Courses"
              delay={300}
              onPress={() => router.push('/my-courses')}
            />
            <MenuItem
              icon="bookmark"
              label="Saved Bookmarks"
              delay={400}
              onPress={() => router.push('/bookmarks')}
            />
            <MenuItem icon="award" label="My Certificates" delay={500} />
            <MenuItem
              icon="credit-card"
              label="Payment Methods"
              delay={600}
              isLast
            />
          </View>

          <Text className="text-[14px] font-bold text-foreground-muted uppercase tracking-widest mb-4 ml-2">
            Preferences
          </Text>

          <View className="bg-white rounded-[24px] border border-black/5 shadow-sm overflow-hidden mb-10">
            <MenuItem icon="user" label="Personal Information" delay={700} />
            <MenuItem icon="bell" label="Notifications" delay={800} />
            <MenuItem icon="shield" label="Privacy & Security" delay={900} />
            <MenuItem
              icon="help-circle"
              label="Help & Support"
              delay={1000}
              isLast
            />
          </View>

          {/* ── LOG OUT BUTTON ── */}
          <Animated.View entering={FadeInUp.delay(900).duration(500)}>
            <Pressable
              onPress={handleLogout}
              className="h-14 rounded-full border-2 border-red-100 bg-red-50 items-center justify-center flex-row gap-2 active:bg-red-100"
            >
              <Feather name="log-out" size={18} color="#EF4444" />
              <Text className="text-[16px] font-bold text-red-500">
                Log Out Securely
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  )
}

// ── HELPER COMPONENTS ──

const StatColumn = ({
  icon,
  value,
  label,
  onPress,
}: {
  icon: any
  value: string
  label: string
  onPress?: () => void
}) => (
  <Pressable
    onPress={onPress}
    className="items-center flex-1 active:opacity-60"
  >
    <View className="w-10 h-10 rounded-full bg-white items-center justify-center mb-2 shadow-sm border border-black/5">
      <Feather name={icon} size={16} color="#229F92" />
    </View>
    <Text className="text-[18px] font-bold text-foreground-strong mb-0.5">
      {value}
    </Text>
    <Text className="text-[11px] font-medium text-foreground-subtle">
      {label}
    </Text>
  </Pressable>
)

const MenuItem = ({
  icon,
  label,
  delay,
  onPress,
  isLast = false,
}: {
  icon: any
  label: string
  delay: number
  onPress?: () => void
  isLast?: boolean
}) => (
  <Animated.View entering={FadeInUp.delay(delay).duration(500)}>
    <Pressable
      onPress={onPress}
      className={`flex-row items-center justify-between p-5 bg-white active:bg-background ${!isLast ? 'border-b border-black/5' : ''}`}
    >
      <View className="flex-row items-center gap-4">
        <View className="w-10 h-10 rounded-full bg-background items-center justify-center">
          <Feather name={icon} size={18} color="#1C3734" />
        </View>
        <Text className="text-[16px] font-bold text-foreground-strong">
          {label}
        </Text>
      </View>
      <Feather name="chevron-right" size={20} color="#92A5A3" />
    </Pressable>
  </Animated.View>
)
