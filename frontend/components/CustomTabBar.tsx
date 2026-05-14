import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useEffect, useRef, useState } from 'react'
import {
  Animated,
  LayoutChangeEvent,
  Text,
  View,
  Pressable,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { C } from '../constants/theme'

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const [tabBarWidth, setTabBarWidth] = useState(0)
  const translateX = useRef(new Animated.Value(0)).current

  // Filter routes to only show visible ones (e.g. hiding course-details)
  const visibleRoutes = state.routes.filter((route) => {
    return route.name !== 'course-details'
  })

  const tabWidth = tabBarWidth / visibleRoutes.length

  const onLayout = (e: LayoutChangeEvent) => {
    setTabBarWidth(e.nativeEvent.layout.width)
  }

  useEffect(() => {
    if (tabWidth === 0) return

    const activeRoute = state.routes[state.index]
    const activeIndex = visibleRoutes.findIndex(r => r.key === activeRoute.key)

    if (activeIndex !== -1) {
      Animated.spring(translateX, {
        toValue: activeIndex * tabWidth,
        useNativeDriver: true,
        stiffness: 120,
        damping: 16,
      }).start()
    }
  }, [state.index, tabWidth, visibleRoutes])

  return (
    <View 
      className="absolute bottom-8 items-center flex-row justify-between rounded-full z-50 bg-white border border-black/5"
      style={{ 
        width: '85%',
        maxWidth: 340,
        alignSelf: 'center',
        paddingHorizontal: 8,
        paddingVertical: 8,
        shadowColor: '#1C3734',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 10,
      }}
    >
      <View
        className="relative flex-row items-center justify-between w-full"
        onLayout={onLayout}
      >
        {/* The Sliding Pill Highlighter */}
        {tabWidth > 0 && (
          <Animated.View
            style={{
              position: 'absolute',
              width: tabWidth,
              height: '100%',
              backgroundColor: C.primary, // Vibrant theme color
              borderRadius: 999,
              transform: [{ translateX }],
            }}
          />
        )}

        {visibleRoutes.map((route, index) => {
          const { options } = descriptors[route.key]
          const label = options.title
          const isFocused = state.routes[state.index].key === route.key

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params)
            }
          }

          // Active states get pure white, inactive get muted gray
          const iconColor = isFocused ? '#FFFFFF' : '#92A5A3'
          
          // Get correct icon name based on route
          let iconName = 'home'
          if (route.name === 'explore-courses') iconName = 'search'
          if (route.name === 'profile') iconName = 'user'

          return (
            <Pressable
              key={route.key}
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              className="relative flex-1 items-center justify-center rounded-full py-3"
            >
              <Feather name={iconName as any} size={20} color={iconColor} />
              
              <Text
                style={{ 
                   fontSize: 10, 
                   fontFamily: isFocused ? 'Poppins_600SemiBold' : 'Poppins_500Medium',
                   marginTop: 3,
                   color: iconColor,
                   letterSpacing: 0.3
                }}
              >
                {label}
              </Text>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}
