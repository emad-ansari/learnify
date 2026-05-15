import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import Toast from 'react-native-toast-message'
import { API_BASE_URL, apiFetch } from '@/api/apiConfig'
import useAuthStore from '@/store/useAuthStore'
import {
  ActivityIndicator,
  Image,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInUp,
  ZoomIn,
} from 'react-native-reanimated'

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function SigninScreen() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Simple validation
  const validate = useCallback(() => {
    const e: Record<string, string> = {}
    if (!email.includes('@')) e.email = 'Enter a valid email'
    if (password.length < 6) e.password = 'Min 6 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }, [email, password])

  const setAuth = useAuthStore((state) => state.setAuth)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignin = async () => {
    if (validate()) {
      setIsLoading(true)
      setErrors({})
      try {
        const response = await apiFetch('/auth/login', {
          method: 'POST',
          body: { email, password },
        })
        
        setAuth(response.data.user, response.data.token)
        Toast.show({
          type: 'success',
          text1: 'Welcome Back!',
          text2: `Signed in as ${response.data.user.name}`,
        })
        router.replace('/(tabs)')
      } catch (error: any) {
        setErrors({ general: error.message || 'Login failed' })
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: error.message || 'Please check your credentials',
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleFocus = useCallback(() => {
    setErrors({})
  }, [])

  const handleBlur = useCallback(() => {
    validate()
  }, [])

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* ── Radial-style gradient background ── */}
      <LinearGradient
        colors={['#84D0C9', '#F9F9FB']}
        locations={[0, 0.4]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        className="absolute top-0 bottom-0 left-0 right-0"
      />

      <View className="flex-1">
        {/* ── Hero illustration ── */}
        <Animated.View
          entering={FadeInDown.duration(700).springify()}
          className="items-center pt-14 pb-2"
        >
          {/* App title */}
          <Text className="text-[32px] font-bold text-secondary mb-3 tracking-tighter">
            Learnify
          </Text>

          <Image source={require('@/assets/images/book-illustration.png')} />
        </Animated.View>

        {/* ── Form card ── */}
        <Animated.View
          entering={FadeInUp.delay(200).duration(600)}
          className="mt-4 bg-primary-subtle px-6 py-4 flex-1 "
          style={{
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
          }}
        >
          {/* Welcome badge */}
          <Animated.View
            entering={ZoomIn.delay(400)}
            className="items-center mb-4"
          >
            <View className="bg-primary-muted rounded-full px-4 py-1 flex items-center justify-center">
              <Text className="text-secondary text-sm font-semibold tracking-[1px] uppercase">
                Welcome Back
              </Text>
            </View>
          </Animated.View>

          {/* Tagline */}
          <Animated.Text
            entering={FadeInLeft.delay(500).duration(450)}
            className="text-secondary-light text-sm font-sans text-center leading-[20px] mb-4 px-2"
          >
            Welcome Back! Sign in to your account
          </Animated.Text>

          {errors && (
            <Text className="text-red-500 text-xs text-center mb-4">
              {errors.general}
            </Text>
          )}

          {/* Email Field */}
          <View className="mb-5">
            <Text className="text-secondary-light font-medium text-sm mb-1.5">
              Email
            </Text>
            <View className="bg-transparent border border-border rounded-2xl h-14 flex flex-row items-center px-4">
              <Ionicons name="mail" size={17} color={'#5a7b78'} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="email@email.com"
                placeholderTextColor="#92A5A3"
                keyboardType="email-address"
                autoCapitalize="none"
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="ml-2 flex-1 text-secondary-light"
              />
            </View>
            {errors.email && (
              <Text className="text-red-500 text-xs text-left mt-1">
                {errors.email}
              </Text>
            )}
          </View>

          {/* Password Field */}
          <View className="mb-5">
            <Text className="text-secondary-light font-medium text-sm mb-1.5">
              Password
            </Text>
            <View className="bg-transparent border border-border rounded-2xl h-14 flex flex-row items-center px-4">
              <Ionicons name="lock-closed" size={17} color={'#5a7b78'} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••••"
                placeholderTextColor="#92A5A3"
                secureTextEntry
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="ml-2 flex-1 text-secondary-light"
              />
            </View>
            {errors.password && (
              <Text className="text-red-500 text-xs  mt-1">
                {errors.password}
              </Text>
            )}
          </View>

          {/* Sign Up button */}
          <Animated.View
            entering={FadeInUp.delay(850).duration(500)}
            className="mt-2"
          >
            <TouchableOpacity
              onPress={handleSignin}
              disabled={isLoading}
              activeOpacity={0.7}
              className={`bg-primary rounded-btn flex-row justify-center gap-2 py-4 items-center shadow-lg shadow-primary elevation-8 ${isLoading ? 'opacity-70' : ''}`}
            >
              {isLoading && <ActivityIndicator size="small" color="#fff" />}
              <Text className="text-secondary text-lg font-bold">
                {isLoading ? 'Signin in...' : 'Signin'}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Login redirect */}
          <Animated.View
            entering={FadeInUp.delay(950).duration(400)}
            className="items-center mt-5"
          >
            <Pressable
              onPress={() => router.replace('/(auth)/signup')}
              hitSlop={10}
            >
              <Text className="text-foreground-muted text-[13px] font-sans">
                Don't have an account?{' '}
                <Text className="text-primary font-semibold">Register</Text>
              </Text>
            </Pressable>
          </Animated.View>

          {/* Legal footer */}

          <Animated.Text
            entering={FadeInUp.delay(1050).duration(400)}
            className="text-foreground-subtle text-[11px] font-sans text-center mt-5 px-8 leading-4"
          >
            By signing in, you agree to our{' '}
            <Text className="text-primary">Terms</Text> and{' '}
            <Text className="text-primary">Privacy Policy</Text>
          </Animated.Text>
        </Animated.View>
      </View>
    </KeyboardAwareScrollView>
  )
}
