/**
 * Welcome Screen
 * Entry point for unauthenticated users
 */

import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen() {
  return (
    <ScreenContainer className="p-6" containerClassName="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-between">
          {/* Hero Section */}
          <View className="flex-1 justify-center items-center gap-6 mt-12">
            {/* Candlestick Chart Placeholder */}
            <LinearGradient
              colors={['#F5C518', '#FFD700']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="w-24 h-32 rounded-lg flex items-center justify-center"
            >
              <Text className="text-2xl font-bold text-background">📈</Text>
            </LinearGradient>

            {/* Logo & Tagline */}
            <View className="items-center gap-2">
              <Text className="text-5xl font-bold text-accent">Ticksnap</Text>
              <Text className="text-base text-muted text-center">
                Made for Traders by Traders
              </Text>
            </View>

            {/* Description */}
            <Text className="text-sm text-muted text-center leading-relaxed max-w-xs">
              Share trades, follow top traders, and stay updated with real-time market insights.
            </Text>
          </View>

          {/* CTA Buttons */}
          <View className="gap-3 mb-8">
            {/* Login Button */}
            <Link href="/login" asChild>
              <TouchableOpacity className="bg-accent rounded-full py-4 px-6 active:opacity-80">
                <Text className="text-background font-bold text-center text-base">
                  Login to your account
                </Text>
              </TouchableOpacity>
            </Link>

            {/* Sign Up Button */}
            <Link href="/signup" asChild>
              <TouchableOpacity className="border-2 border-accent rounded-full py-4 px-6 active:opacity-80">
                <Text className="text-accent font-bold text-center text-base">
                  Create new account
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
