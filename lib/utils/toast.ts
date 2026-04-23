/**
 * Toast Utility
 * Non-blocking toast notifications using ToastAndroid on Android and console on iOS
 */

import { Platform, ToastAndroid, Alert } from 'react-native';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export function showToast(message: string, type: ToastType = 'info') {
  if (Platform.OS === 'android') {
    // Use native ToastAndroid on Android (non-blocking)
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else if (Platform.OS === 'ios') {
    // On iOS, only show errors via Alert (blocking), skip success/info
    if (type === 'error') {
      Alert.alert('Error', message);
    } else {
      // Log to console for success/info (non-blocking)
      console.log(`[Toast ${type}] ${message}`);
    }
  } else {
    // Web: use console
    console.log(`[Toast ${type}] ${message}`);
  }
}

export function showSuccessToast(message: string) {
  showToast(message, 'success');
}

export function showErrorToast(message: string) {
  showToast(message, 'error');
}

export function showInfoToast(message: string) {
  showToast(message, 'info');
}

export function showWarningToast(message: string) {
  showToast(message, 'warning');
}
