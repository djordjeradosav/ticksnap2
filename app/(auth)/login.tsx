/**
 * Login Screen
 * User login with email and password
 */

import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useAuth } from '@/hooks/useAuth';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      router.replace('/(tabs)');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <ScreenContainer className="p-6" containerClassName="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-between">
          {/* Header */}
          <View className="gap-2 mt-8">
            <Text className="text-4xl font-bold text-foreground">Welcome Back</Text>
            <Text className="text-base text-muted">Log in to your Ticksnap account</Text>
          </View>

          {/* Form */}
          <View className="gap-4 flex-1 justify-center">
            {/* Error Message */}
            {error && (
              <View className="bg-error/10 border border-error rounded-lg p-3">
                <Text className="text-error text-sm">{error}</Text>
              </View>
            )}

            {/* Email Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Email</Text>
              <TextInput
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
                placeholder="you@example.com"
                placeholderTextColor="#888888"
                value={email}
                onChangeText={setEmail}
                editable={!loading}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Password</Text>
              <TextInput
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
                placeholder="••••••••"
                placeholderTextColor="#888888"
                value={password}
                onChangeText={setPassword}
                editable={!loading}
                secureTextEntry
              />
            </View>

            {/* Forgot Password Link */}
            <TouchableOpacity>
              <Text className="text-accent text-sm font-semibold">Forgot password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              className="bg-accent rounded-full py-4 px-6 active:opacity-80 mt-4"
              onPress={handleLogin}
              disabled={loading}
            >
              <Text className="text-background font-bold text-center text-base">
                {loading ? 'Logging in...' : 'Log in →'}
              </Text>
            </TouchableOpacity>

            {/* Demo Quick Login */}
            <TouchableOpacity
              className="border border-accent rounded-full py-3 px-6 active:opacity-80"
              onPress={async () => {
                try {
                  await signIn('demo@example.com', 'Demo123!@#');
                  router.replace('/(tabs)');
                } catch (err) {
                  console.error('Demo login failed:', err);
                }
              }}
              disabled={loading}
            >
              <Text className="text-accent font-semibold text-center text-sm">
                Try Demo Account
              </Text>
            </TouchableOpacity>


          </View>

          {/* OAuth Buttons */}
          <View className="gap-3 mb-8">
            <Text className="text-center text-muted text-sm">Or continue with</Text>
            <View className="flex-row gap-3">
              <TouchableOpacity 
                className="flex-1 border border-border rounded-lg py-3 active:opacity-80"
                onPress={() => {
                  // TODO: Implement Google OAuth via Supabase
                  console.log('Google OAuth - coming soon');
                }}
                disabled={loading}
              >
                <Text className="text-foreground font-semibold text-center">Google</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="flex-1 border border-border rounded-lg py-3 active:opacity-80"
                onPress={() => {
                  // TODO: Implement Apple OAuth via Supabase
                  console.log('Apple OAuth - coming soon');
                }}
                disabled={loading}
              >
                <Text className="text-foreground font-semibold text-center">Apple</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up Link */}
          <View className="flex-row justify-center gap-1 mb-8">
            <Text className="text-muted text-sm">Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text className="text-accent text-sm font-semibold">Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
