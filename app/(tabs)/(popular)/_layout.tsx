/**
 * Popular Feed Layout
 * Navigation for popular feed screens
 */

import { Stack } from 'expo-router';

export default function PopularLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
