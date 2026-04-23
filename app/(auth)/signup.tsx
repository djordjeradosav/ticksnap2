/**
 * Sign Up Screen
 * User registration with email, username, and password
 */

import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useAuth } from '@/hooks/useAuth';

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSignUp = async () => {
    try {
      setLocalError(null);
      await signUp(email, username, password, fullName);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign up failed';
      setLocalError(message);
      console.error('Signup error:', err);
    }
  };

  const isFormValid = email && username && password && password.length >= 8;

  return (
    <ScreenContainer className="p-6" containerClassName="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-between">
          {/* Header */}
          <View className="gap-2 mt-8">
            <Text className="text-4xl font-bold text-foreground">Create Account</Text>
            <Text className="text-base text-muted">Join Ticksnap to share your trades</Text>
          </View>

          {/* Form */}
          <View className="gap-4 flex-1 justify-center">
            {/* Error Message */}
            {(localError || error) && (
              <View className="bg-error/10 border border-error rounded-lg p-3">
                <Text className="text-error text-sm">{localError || error?.message}</Text>
              </View>
            )}

            {/* Full Name Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Full Name (Optional)</Text>
              <TextInput
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
                placeholder="John Doe"
                placeholderTextColor="#888888"
                value={fullName}
                onChangeText={setFullName}
                editable={!isLoading}
              />
            </View>

            {/* Email Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Email</Text>
              <TextInput
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
                placeholder="you@example.com"
                placeholderTextColor="#888888"
                value={email}
                onChangeText={setEmail}
                editable={!isLoading}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Username Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Username</Text>
              <TextInput
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
                placeholder="trader_pro"
                placeholderTextColor="#888888"
                value={username}
                onChangeText={setUsername}
                editable={!isLoading}
                autoCapitalize="none"
              />
              <Text className="text-xs text-muted">3-20 characters, letters/numbers/underscores only</Text>
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
                editable={!isLoading}
                secureTextEntry
              />
              <Text className="text-xs text-muted">At least 8 characters</Text>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              className="bg-accent rounded-full py-4 px-6 active:opacity-80 mt-4"
              onPress={handleSignUp}
              disabled={isLoading || !isFormValid}
            >
              <Text className="text-background font-bold text-center text-base">
                {isLoading ? 'Creating account...' : 'Complete sign up →'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* OAuth Buttons */}
          <View className="gap-3 mb-8">
            <Text className="text-center text-muted text-sm">Or sign up with</Text>
            <View className="flex-row gap-3">
              <TouchableOpacity 
                className="flex-1 border border-border rounded-lg py-3 active:opacity-80"
                onPress={() => {
                  console.log('Google OAuth - coming soon');
                }}
                disabled={isLoading}
              >
                <Text className="text-foreground font-semibold text-center">Google</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="flex-1 border border-border rounded-lg py-3 active:opacity-80"
                onPress={() => {
                  console.log('Apple OAuth - coming soon');
                }}
                disabled={isLoading}
              >
                <Text className="text-foreground font-semibold text-center">Apple</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Link */}
          <View className="flex-row justify-center gap-1 mb-8">
            <Text className="text-muted text-sm">Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text className="text-accent text-sm font-semibold">Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
