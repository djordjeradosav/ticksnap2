/**
 * useAuth Hook
 * Email/password authentication using tRPC backend
 */

import { useCallback } from 'react';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { trpc } from '@/lib/trpc';
import { useAuthStore } from '@/store/authStore';

export function useAuth() {
  const router = useRouter();
  const { user, token, setUser, setToken, clearAuth } = useAuthStore();

  const loginMutation = trpc.auth.login.useMutation();
  const signupMutation = trpc.auth.signup.useMutation();
  const meMutation = trpc.auth.me.useQuery();

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        const result = await loginMutation.mutateAsync({ email, password });
        
        // Store token
        await SecureStore.setItemAsync('auth_token', result.token);
        
        // Update store
        setToken(result.token);
        setUser(result.user);
        
        // Redirect to tabs
        router.replace('/(tabs)');
        
        return result;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    [loginMutation, setToken, setUser, router]
  );

  const signUp = useCallback(
    async (email: string, username: string, password: string, fullName?: string) => {
      try {
        const result = await signupMutation.mutateAsync({
          email,
          username,
          password,
          fullName,
        });
        
        // Store token
        await SecureStore.setItemAsync('auth_token', result.token);
        
        // Update store
        setToken(result.token);
        setUser(result.user);
        
        // Redirect to tabs
        router.replace('/(tabs)');
        
        return result;
      } catch (error) {
        console.error('Signup failed:', error);
        throw error;
      }
    },
    [signupMutation, setToken, setUser, router]
  );

  const signOut = useCallback(
    async () => {
      try {
        // Clear token from storage
        await SecureStore.deleteItemAsync('auth_token');
        
        // Clear store
        clearAuth();
        
        // Redirect to auth
        router.replace('/(auth)');
      } catch (error) {
        console.error('Logout failed:', error);
        throw error;
      }
    },
    [clearAuth, router]
  );

  const refreshUser = useCallback(
    async () => {
      try {
        const result = await meMutation.refetch();
        if (result.data) {
          setUser(result.data);
        }
      } catch (error) {
        console.error('Failed to refresh user:', error);
      }
    },
    [meMutation, setUser]
  );

  return {
    user,
    token,
    signIn,
    signUp,
    signOut,
    refreshUser,
    isLoading: loginMutation.isPending || signupMutation.isPending,
    error: loginMutation.error || signupMutation.error,
    isAuthenticated: !!user && !!token,
  };
}
