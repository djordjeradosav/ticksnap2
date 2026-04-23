/**
 * Welcome Screen
 * Yellow top half with Ticksnap branding, white bottom half with login/signup buttons
 */

import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ScreenContainer edges={['top', 'left', 'right', 'bottom']} containerClassName="bg-background flex-1">
      {/* Yellow Top Half */}
      <View className="flex-1 bg-accent items-center justify-center px-6">
        <Text className="text-5xl font-bold text-black mb-8">Ticksnap</Text>
        
        {/* Candlestick Chart Placeholder */}
        <View className="w-24 h-24 bg-black rounded-lg mb-8 items-center justify-center">
          <Text className="text-white text-3xl">📊</Text>
        </View>

        <Text className="text-2xl font-bold text-black mb-2">Welcome to Ticksnap</Text>
        <Text className="text-sm text-black/60">Made for Traders by Traders</Text>
      </View>

      {/* White Bottom Half */}
      <View className="flex-1 bg-white items-center justify-center px-6 gap-4">
        {/* Login Button - Black background, white text */}
        <TouchableOpacity
          className="w-full bg-black rounded-full py-4 active:opacity-80"
          onPress={() => router.push('/login')}
        >
          <Text className="text-white font-bold text-center text-base">
            Login to your account →
          </Text>
        </TouchableOpacity>

        {/* Sign Up Button - White background, black border, black text */}
        <TouchableOpacity
          className="w-full bg-white border-2 border-black rounded-full py-4 active:opacity-80"
          onPress={() => router.push('/signup')}
        >
          <Text className="text-black font-bold text-center text-base">
            Create new account
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
