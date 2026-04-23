/**
 * Settings Screen\n * App settings and preferences\n */

import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuth } from '@/hooks/useAuth';
import { useColors } from '@/hooks/use-colors';

export default function SettingsScreen() {
  const router = useRouter();
  const colors = useColors();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace('/(auth)');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const MenuItem = ({ title, icon }: { title: string; icon: string }) => (
    <TouchableOpacity className="flex-row items-center justify-between bg-card rounded-lg p-4 mb-2 border border-border active:opacity-80">
      <Text className="text-sm font-semibold text-foreground">{title}</Text>
      <IconSymbol name={icon as any} size={20} color={colors.muted} />
    </TouchableOpacity>
  );

  return (
    <ScreenContainer className="p-6" containerClassName="bg-background">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text className="text-2xl font-bold text-foreground mb-6">Settings</Text>

        {/* Account Section */}
        <View className="mb-6">
          <Text className="text-xs font-semibold text-muted uppercase mb-3">Account</Text>
          <MenuItem title="Edit Profile" icon="person.fill" />
          <MenuItem title="Account Privacy" icon="lock.fill" />
          <MenuItem title="Change Password" icon="key.fill" />
        </View>

        {/* Preferences Section */}
        <View className="mb-6">
          <Text className="text-xs font-semibold text-muted uppercase mb-3">Preferences</Text>
          <MenuItem title="App Experience" icon="gear" />
          <MenuItem title="Notification Settings" icon="bell.fill" />
          <MenuItem title="Language" icon="globe" />
        </View>

        {/* Support Section */}
        <View className="mb-6">
          <Text className="text-xs font-semibold text-muted uppercase mb-3">Support</Text>
          <MenuItem title="Terms of Service" icon="doc.fill" />
          <MenuItem title="Privacy Policy" icon="shield.fill" />
          <MenuItem title="Help & Support" icon="questionmark.circle.fill" />
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          className="bg-error/10 border border-error rounded-lg py-4 mt-8 active:opacity-80"
          onPress={handleLogout}
        >
          <Text className="text-error font-bold text-center">Logout</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text className="text-xs text-muted text-center mt-8 mb-4">Ticksnap v1.0.0</Text>
      </ScrollView>
    </ScreenContainer>
  );
}
