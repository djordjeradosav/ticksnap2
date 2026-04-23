/**
 * UserAvatar Component
 * Circular avatar with optional ring/border
 */

import { Text, View } from 'react-native';

interface UserAvatarProps {
  size?: number;
  initials?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
}

export function UserAvatar({
  size = 40,
  initials = 'U',
  backgroundColor = '#F5C518',
  borderColor = '#2A2A2A',
  borderWidth = 2,
}: UserAvatarProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        borderColor,
        borderWidth,
      }}
      className="items-center justify-center"
    >
      <Text
        style={{ fontSize: size * 0.4 }}
        className="font-bold text-background"
      >
        {initials}
      </Text>
    </View>
  );
}
