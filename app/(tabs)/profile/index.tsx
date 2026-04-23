/**
 * Profile Screen
 * User profile with stats and trades
 */

import { ScrollView, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useAuth } from '@/hooks/useAuth';
import { useColors } from '@/hooks/use-colors';

export default function ProfileScreen() {
  const colors = useColors();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <ScreenContainer className="p-6" containerClassName="bg-background">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Avatar & Info */}
        <View className="items-center mb-6">
          <View className="w-20 h-20 bg-accent rounded-full mb-4" />
          <Text className="text-2xl font-bold text-foreground">{user?.email || 'User'}</Text>
          <Text className="text-sm text-muted mt-1">Premium Trader</Text>
        </View>

        {/* Stats */}
        <View className="flex-row justify-around bg-surface rounded-lg p-4 mb-6 border border-border">
          <View className="items-center">
            <Text className="text-xl font-bold text-accent">1.2K</Text>
            <Text className="text-xs text-muted mt-1">Followers</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold text-accent">342</Text>
            <Text className="text-xs text-muted mt-1">Following</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-bold text-accent">89</Text>
            <Text className="text-xs text-muted mt-1">Trades</Text>
          </View>
        </View>

        {/* Follow Button */}
        <TouchableOpacity className="bg-accent rounded-full py-3 mb-6 active:opacity-80">
          <Text className="text-background font-bold text-center">Edit Profile</Text>
        </TouchableOpacity>

        {/* Best Trades */}
        <View className="gap-3 mb-6">
          <Text className="text-lg font-bold text-foreground">Best Trades</Text>
          <FlatList
            data={[1, 2, 3]}
            renderItem={({ item }) => (
              <TouchableOpacity className="bg-card rounded-lg p-4 mb-3 border border-border active:opacity-80">
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-sm font-semibold text-foreground">EUR/USD</Text>
                    <Text className="text-xs text-success">+$125.50</Text>
                  </View>
                  <Text className="text-xs text-muted">2 days ago</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.toString()}
            scrollEnabled={false}
          />
        </View>

        {/* Followed Accounts */}
        <View className="gap-3 mb-6">
          <Text className="text-lg font-bold text-foreground">Followed Accounts</Text>
          <FlatList
            horizontal
            data={[1, 2, 3, 4]}
            renderItem={({ item }) => (
              <View className="items-center mr-4 gap-2">
                <View className="w-12 h-12 bg-accent rounded-full" />
                <Text className="text-xs text-muted">Trader {item}</Text>
              </View>
            )}
            keyExtractor={(item) => item.toString()}
            scrollEnabled={false}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          className="bg-error/10 border border-error rounded-lg py-3 active:opacity-80"
          onPress={handleLogout}
        >
          <Text className="text-error font-bold text-center">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
}
