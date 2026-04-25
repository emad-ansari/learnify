import React from "react";
import { Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, value, label, delay = 0 }) => (
  <Animated.View
    entering={FadeInDown.delay(delay).duration(500)}
    className="flex-1 bg-white rounded-[24px] p-4 items-start border border-black/5 shadow-sm"
    style={{ elevation: 3 }}
  >
    {/* Icon Container */}
    <View className="w-[42px] h-[42px] rounded-[14px] bg-primary-subtle items-center justify-center mb-3">
      {icon}
    </View>

    <View>
      <Text className="text-[18px] font-bold text-foreground-strong tracking-tight">
        {value}
      </Text>
      <Text className="text-[12px] font-normal text-foreground-subtle mt-0.5">
        {label}
      </Text>
    </View>
  </Animated.View>
);
