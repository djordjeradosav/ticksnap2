/**
 * Login Screen
 * White background with form inputs and yellow button
 */

import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useAuth } from '@/hooks/useAuth';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, isLoading, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setLocalError(null);
      // Use username as email for now
      await signIn(username, password);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setLocalError(message);
      console.error('Login error:', err);
    }
  };

  return (
    <ScreenContainer className="bg-white" containerClassName="bg-white">
      {/* Header */}
      <View className="flex-row items-center gap-3 pb-4 border-b border-border">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-2xl">←</Text>
        </TouchableOpacity>
        <Text className="text-lg font-bold text-black">Login</Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className="py-6">
        <View className="gap-4 flex-1">
          {/* Error Message */}
          {(localError || error) && (
            <View className="bg-error/10 border border-error rounded-lg p-3">
              <Text className="text-error text-sm">{localError || error?.message}</Text>
            </View>
          )}

          {/* Username Input */}
          <View className="gap-2">
            <TextInput
              className="bg-surface rounded-lg px-4 py-3 text-black text-base"
              placeholder="Username"
              placeholderTextColor="#888888"
              value={username}
              onChangeText={setUsername}
              editable={!isLoading}
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View className="gap-2">
            <TextInput
              className="bg-surface rounded-lg px-4 py-3 text-black text-base"
              placeholder="Password"
              placeholderTextColor="#888888"
              value={password}
              onChangeText={setPassword}
              editable={!isLoading}
              secureTextEntry
            />
          </View>

          {/* Forgot Password Link */}
          <TouchableOpacity>
            <Text className="text-muted text-sm">Forgot password?</Text>
          </TouchableOpacity>

          {/* Login Button - Yellow pill */}
          <TouchableOpacity
            className="bg-accent rounded-full py-4 px-6 active:opacity-80 mt-4"
            onPress={handleLogin}
            disabled={isLoading || !username || !password}
          >
            <Text className="text-black font-bold text-center text-base">
              {isLoading ? 'Logging in...' : 'Login →'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
