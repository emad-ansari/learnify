/**
 * SignupScreen.tsx — Learnify
 *
 * Stack: Expo + NativeWind v4 + React Native Reanimated v3
 *
 * Animations used:
 *  1. Hero image   — slides + fades in from above (FadeInDown)
 *  2. Form card    — springs up from below (FadeInUp with spring)
 *  3. Badge        — scale-bounces in after card (ZoomIn)
 *  4. Each field   — staggered fade-in left-to-right (FadeInLeft)
 *  5. Button       — pulse scale loop while idle (withRepeat)
 *  6. Input focus  — border color animates via useAnimatedStyle
 *  7. Button press — scale-down spring on press (useSharedValue)
 *
 * Dependencies to install (if not already):
 *   npx expo install react-native-reanimated
 *   npx expo install expo-linear-gradient
 *   npx expo install @expo-google-fonts/poppins expo-font
 *   npm install nativewind   (v4)
 *   npm install react-native-svg   (for inline SVG icons)
 */

import { FontAwesome6, Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import Toast from 'react-native-toast-message'
import { apiFetch } from '@/api/apiConfig'
import useAuthStore from '@/store/useAuthStore'
import {
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
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
  ZoomIn,
} from 'react-native-reanimated'

// ─── Animated InputField component ───────────────────────────────────────────
interface InputFieldProps {
  label: string
  placeholder: string
  icon: React.ReactNode
  value: string
  onChangeText: (t: string) => void
  secureTextEntry?: boolean
  keyboardType?: 'default' | 'email-address'
  delay?: number
  error?: string
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  icon,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  delay = 0,
  error,
}) => {
  const [focused, setFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Animate border colour on focus
  const borderProgress = useSharedValue(0)
  const handleFocus = () => {
    setFocused(true)
    borderProgress.value = withTiming(1, { duration: 250 })
  }
  const handleBlur = () => {
    setFocused(false)
    borderProgress.value = withTiming(0, { duration: 250 })
  }

  const animatedBorder = useAnimatedStyle(() => ({
    borderColor: borderProgress.value === 1 ? '#229F92' : '#819C99',
    // Slight scale-up on focus for "breathing" effect
    transform: [{ scale: withSpring(focused ? 1.005 : 1) }],
  }))

  return (
    <Animated.View
      entering={FadeInLeft.delay(delay).duration(500).springify()}
      className="mb-5"
    >
      <Text className="text-secondary-light font-medium text-sm mb-1.5">
        {label}
      </Text>

      <Animated.View
        className="flex-row items-center bg-transparent rounded-input border-[1.5px] px-[14px]  shadow-sm shadow-secondary h-11"
        style={animatedBorder}
      >
        <View className="mr-2.5">{icon}</View>

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#92A5A3"
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize="none"
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="flex-1 text-[14px] text-secondary font-sans py-0"
        />

        {/* Show/hide toggle for password */}
        {secureTextEntry && (
          <Pressable onPress={() => setShowPassword((v) => !v)} hitSlop={8}>
            {showPassword ? (
              <FontAwesome6 name="eye-slash" size={14} color={'#229f92'} />
            ) : (
              <FontAwesome6 name="eye" size={14} color={'#92A5A3'} />
            )}
          </Pressable>
        )}
      </Animated.View>

      {error ? (
        <Text className="text-error text-[12px] mt-1">{error}</Text>
      ) : null}
    </Animated.View>
  )
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function SignupScreen() {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Button press animation
  const btnScale = useSharedValue(1)

  // Subtle idle pulse on button (starts after mount)
  React.useEffect(() => {
    btnScale.value = withRepeat(
      withSequence(
        withTiming(1.03, { duration: 900 }),
        withTiming(1.0, { duration: 900 }),
      ),
      -1, // infinite
      true,
    )
  }, [])

  // Simple validation
  const validate = useCallback(() => {
    const e: Record<string, string> = {}
    if (!username.trim()) e.username = 'Name is required'
    if (!email.includes('@')) e.email = 'Enter a valid email'
    if (password.length < 6) e.password = 'Min 6 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }, [username, email, password])

  const setAuth = useAuthStore((state) => state.setAuth)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = async () => {
    if (validate()) {
      setIsLoading(true)
      setErrors({})
      try {
        const response = await apiFetch('/auth/register', {
          method: 'POST',
          body: { name: username, email, password },
        })
        setAuth(response.data.user, response.data.token)
        Toast.show({
          type: 'success',
          text1: 'Account Created!',
          text2: 'Welcome to Learnify!',
        })
        router.replace('/(tabs)')
      } catch (error: any) {
        setErrors({ general: error.message || 'Registration failed' })
        Toast.show({
          type: 'error',
          text1: 'Registration Failed',
          text2: error.message || 'Could not create account',
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

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

      <View >
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
          entering={FadeInUp.delay(200).duration(600).springify().damping(18)}
          className="mt-4 bg-primary-subtle px-6 py-4  "
          style={{
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
          }}
        >
          {/* Welcome badge */}
          <Animated.View
            entering={ZoomIn.delay(400).duration(450).springify()}
            className="items-center mb-4"
          >
            <View className="bg-primary-muted rounded-full px-4 py-1 flex items-center justify-center">
              <Text className="text-secondary text-sm font-semibold tracking-[1px] uppercase">
                Join Now
              </Text>
            </View>
          </Animated.View>

          {/* Tagline */}
          <Animated.Text
            entering={FadeInLeft.delay(500).duration(450)}
            className="text-secondary-light text-sm font-sans text-center leading-[20px] mb-7 px-2"
          >
            Explore courses you love and unlock knowledge{'\n'}
            anytime, anywhere.
          </Animated.Text>

          {errors.general && (
            <Text className="text-red-500 text-xs text-center mb-4">{errors.general}</Text>
          )}

          {/* User Name Field */}
          <View className="mb-5">
            <Text className="text-secondary-light font-medium text-sm mb-1.5">
              User Name
            </Text>
            <View className="bg-transparent border border-border rounded-2xl h-14 flex flex-row items-center px-4">
              <FontAwesome6 name="user" size={17} color={'#5a7b78'} />
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="John Doe"
                placeholderTextColor="#92A5A3"
                keyboardType="default"
                autoCapitalize="none"
                // onFocus={handleFocus}
                // onBlur={handleBlur}
                className="ml-2 flex-1 text-secondary-light"
              />
            </View>
          </View>

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
                // onFocus={handleFocus}
                // onBlur={handleBlur}
                className="ml-2 flex-1 text-secondary-light"
              />
            </View>
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
                // onFocus={handleFocus}
                // onBlur={handleBlur}
                className="ml-2 flex-1 text-secondary-light"
              />
            </View>
          </View>

          {/* Sign Up button */}
          <Animated.View
            entering={FadeInUp.delay(850).duration(500)}
            className="mt-2"
          >
            <TouchableOpacity
              onPress={handleSignup}
              disabled={isLoading}
              activeOpacity={0.7}
              className={`bg-primary rounded-btn py-4 items-center shadow-lg shadow-primary elevation-8 ${isLoading ? 'opacity-70' : ''}`}
            >
              <Text className="text-white text-base font-bold tracking-[0.3px]">
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Login redirect */}
          <Animated.View
            entering={FadeInUp.delay(950).duration(400)}
            className="items-center mt-5"
          >
            <Pressable
              onPress={() => router.replace('/(auth)/signin')}
              hitSlop={10}
            >
              <Text className="text-foreground-muted text-[13px] font-sans">
                Already have an account?{' '}
                <Text className="text-primary font-semibold">Login</Text>
              </Text>
            </Pressable>
          </Animated.View>

          {/* Legal footer */}
          <Animated.Text
            entering={FadeInUp.delay(1050).duration(400)}
            className="text-foreground-subtle text-[11px] font-sans text-center mt-5 px-8 leading-4"
          >
            By signing up, you agree to our{' '}
            <Text className="text-primary">Terms</Text> and{' '}
            <Text className="text-primary">Privacy Policy</Text>
          </Animated.Text>
        </Animated.View>
      </View>
    </KeyboardAwareScrollView>
  )
}
