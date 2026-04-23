/**
 * TickerBadge Component
 * Small pill-shaped badge for displaying ticker symbols
 * Example: 🟢 Racks | 🇪🇺 EURGBP
 */

import { View, Text } from 'react-native';

interface TickerBadgeProps {
  icon?: string;
  label: string;
  size?: 'sm' | 'md';
}

export function TickerBadge({ icon, label, size = 'sm' }: TickerBadgeProps) {
  const sizeClasses = size === 'sm' ? 'px-2 py-1' : 'px-3 py-2';
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <View className={`bg-surface border border-border rounded-full flex-row items-center gap-1 ${sizeClasses}`}>
      {icon && <Text className="text-sm">{icon}</Text>}
      <Text className={`text-black font-semibold ${textSize}`}>{label}</Text>
    </View>
  );
}
