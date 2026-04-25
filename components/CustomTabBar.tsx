import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { PlatformPressable } from '@react-navigation/elements'
import { useLinkBuilder } from '@react-navigation/native'
import { useEffect, useRef, useState } from 'react'
import {
  Animated,
  LayoutChangeEvent,
  Text,
  View,
} from 'react-native'
import { C } from '../constants/theme'

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { buildHref } = useLinkBuilder()
  const [tabBarWidth, setTabBarWidth] = useState(0)
  const translateX = useRef(new Animated.Value(0)).current

  // Filter routes to only show visible ones
  const visibleRoutes = state.routes.filter((route) => {
    return route.name !== 'course-details'
  })

  const tabWidth = tabBarWidth / visibleRoutes.length

  // Measure the inner row width for accurate highlighter placement
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
        stiffness: 140,
        damping: 18,
      }).start()
    }
  }, [state.index, tabWidth, visibleRoutes])

  // Forced Light Theme colors
  const tabTintColor = C.primary
  const inactiveColor = "#92A5A3"
  const highlighterColor = "#E6F6F4" // Very subtle primary tint

  return (
    <View 
      className="absolute bottom-10 items-center flex-row justify-between rounded-full z-50"
      style={{ 
        backgroundColor: '#FFFFFF', 
        borderWidth: 1, 
        borderColor: 'rgba(0,0,0,0.05)',
        width: '78%',
        alignSelf: 'center',
        paddingHorizontal: 6,
        paddingVertical: 6,
        // Premium soft shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 8,
      }}
    >
      <View
        className="relative flex-row items-center justify-between w-full"
        onLayout={onLayout}
      >
        {tabWidth > 0 && (
          <Animated.View
            style={{
              position: 'absolute',
              width: tabWidth,
              height: '100%',
              backgroundColor: highlighterColor,
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

          return (
            <PlatformPressable
              key={route.key}
              href={buildHref(route.name, route.params)}
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              className="relative flex-1 items-center justify-center rounded-full py-2.5"
            >
              {/* ICON */}
              {options.tabBarIcon?.({
                focused: isFocused,
                color: isFocused ? tabTintColor : inactiveColor,
                size: 20,
              })}

              <Text
                style={{ 
                  fontSize: 10, 
                  fontFamily: isFocused ? 'Poppins_600SemiBold' : 'Poppins_400Regular',
                  marginTop: 2,
                  color: isFocused ? tabTintColor : inactiveColor
                }}
              >
                {label}
              </Text>
            </PlatformPressable>
          )
        })}
      </View>
    </View>
  )
}
