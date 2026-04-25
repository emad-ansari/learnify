import { Tabs } from 'expo-router'
import CustomTabBar from '@/components/CustomTabBar'
import { Feather } from '@expo/vector-icons'
import { C } from '../../constants/theme'

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore-courses"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="course-details"
        options={{
          title: 'Course Details',
          href: null,
        }}
      />
    </Tabs>
  )
}
