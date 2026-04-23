/**
 * Sign Up Screen
 * User registration with email, password, and phone
 */

import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useAuth } from '@/hooks/useAuth';

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!agreedToTerms) {
      alert('Please agree to the terms and privacy policy');
      return;
    }

    try {
      await signUp(email, password, phone);
      router.replace('/(tabs)');
    } catch (err) {
      console.error('Sign up failed:', err);
    }
  };

  return (
    <ScreenContainer className="p-6" containerClassName="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-between">
          {/* Header */}
          <View className="gap-2 mt-8">
            <Text className="text-4xl font-bold text-foreground">Create Account</Text>
            <Text className="text-base text-muted">Join Ticksnap and start trading</Text>
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

            {/* Phone Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Phone Number</Text>
              <TextInput
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
                placeholder="+1 (555) 000-0000"
                placeholderTextColor="#888888"
                value={phone}
                onChangeText={setPhone}
                editable={!loading}
                keyboardType="phone-pad"
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

            {/* Confirm Password Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Confirm Password</Text>
              <TextInput
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
                placeholder="••••••••"
                placeholderTextColor="#888888"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                editable={!loading}
                secureTextEntry
              />
            </View>

            {/* Terms Checkbox */}
            <TouchableOpacity
              className="flex-row items-center gap-3 py-2"
              onPress={() => setAgreedToTerms(!agreedToTerms)}
            >
              <View
                className={`w-5 h-5 rounded border-2 ${
                  agreedToTerms ? 'bg-accent border-accent' : 'border-border'
                }`}
              >
                {agreedToTerms && <Text className="text-background text-center">✓</Text>}
              </View>
              <Text className="text-sm text-muted flex-1">
                By selecting this field you agree to Ticksnap's privacy policy and terms of services
              </Text>
            </TouchableOpacity>

            {/* Sign Up Button */}
            <TouchableOpacity
              className="bg-accent rounded-full py-4 px-6 active:opacity-80 mt-4"
              onPress={handleSignUp}
              disabled={loading}
            >
              <Text className="text-background font-bold text-center text-base">
                {loading ? 'Creating account...' : 'Complete sign up →'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* OAuth Buttons */}
          <View className="gap-3 mb-8">
            <Text className="text-center text-muted text-sm">Or sign up with</Text>
            <View className="flex-row gap-3">
              <TouchableOpacity className="flex-1 border border-border rounded-lg py-3 active:opacity-80">
                <Text className="text-foreground font-semibold text-center">Google</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 border border-border rounded-lg py-3 active:opacity-80">
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
