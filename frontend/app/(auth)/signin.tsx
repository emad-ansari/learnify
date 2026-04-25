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

import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
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
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  ZoomIn,
} from 'react-native-reanimated'

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function SigninScreen() {
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

  const handleSignup = () => {
    if (validate()) {
      // TODO: wire to your auth logic
      console.log('Sign up →', { username, email })
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
          entering={FadeInUp.delay(200).duration(600).springify().damping(18)}
          className="mt-4 bg-primary-subtle px-6 py-4 flex-1 "
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
              activeOpacity={0.7}
              className="bg-primary rounded-btn py-4 items-center shadow-lg shadow-primary elevation-8"
            >
              <Text className="text-white text-base font-bold tracking-[0.3px]">
                Sign In
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
