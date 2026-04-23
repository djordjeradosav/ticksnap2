/**
 * Sign Up Screen
 * White background with form inputs and yellow button
 */

import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useAuth } from '@/hooks/useAuth';

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp, isLoading, error } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSignUp = async () => {
    if (!agreedToTerms) {
      setLocalError('Please agree to terms and privacy policy');
      return;
    }
    try {
      setLocalError(null);
      await signUp(email, username, password, fullName);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign up failed';
      setLocalError(message);
      console.error('Signup error:', err);
    }
  };

  const isFormValid = username && email && password && agreedToTerms;

  return (
    <ScreenContainer className="bg-white" containerClassName="bg-white">
      {/* Header */}
      <View className="flex-row items-center gap-3 pb-4 border-b border-border">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-2xl">←</Text>
        </TouchableOpacity>
        <Text className="text-lg font-bold text-black">Create new Account</Text>
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
          <TextInput
            className="bg-surface rounded-lg px-4 py-3 text-black text-base h-12"
            placeholder="Username"
            placeholderTextColor="#888888"
            value={username}
            onChangeText={setUsername}
            editable={!isLoading}
            autoCapitalize="none"
          />

          {/* Email Input */}
          <TextInput
            className="bg-surface rounded-lg px-4 py-3 text-black text-base h-12"
            placeholder="Email address"
            placeholderTextColor="#888888"
            value={email}
            onChangeText={setEmail}
            editable={!isLoading}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Phone Number Input */}
          <TextInput
            className="bg-surface rounded-lg px-4 py-3 text-black text-base h-12"
            placeholder="Phone number"
            placeholderTextColor="#888888"
            editable={!isLoading}
            keyboardType="phone-pad"
          />

          {/* Password Input */}
          <TextInput
            className="bg-surface rounded-lg px-4 py-3 text-black text-base h-12"
            placeholder="Password"
            placeholderTextColor="#888888"
            value={password}
            onChangeText={setPassword}
            editable={!isLoading}
            secureTextEntry
          />

          {/* Terms Checkbox */}
          <TouchableOpacity
            className="flex-row items-start gap-3 py-2"
            onPress={() => setAgreedToTerms(!agreedToTerms)}
          >
            <View
              className={`w-5 h-5 rounded border-2 mt-1 ${
                agreedToTerms ? 'bg-accent border-accent' : 'border-border'
              }`}
            >
              {agreedToTerms && <Text className="text-black text-center text-xs font-bold">✓</Text>}
            </View>
            <Text className="text-xs text-muted flex-1 leading-relaxed">
              By selecting this field you agree to Ticksnap's privacy policy and{' '}
              <Text className="text-accent font-bold">Terms of Service</Text>
            </Text>
          </TouchableOpacity>

          {/* Sign Up Button - Yellow pill */}
          <TouchableOpacity
            className="bg-accent rounded-full py-4 px-6 active:opacity-80 mt-4"
            onPress={handleSignUp}
            disabled={isLoading || !isFormValid}
          >
            <Text className="text-black font-bold text-center text-base">
              {isLoading ? 'Creating account...' : 'Complete sign up →'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
