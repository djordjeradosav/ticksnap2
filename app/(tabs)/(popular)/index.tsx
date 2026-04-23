/**
 * Popular Feed Screen
 * Main feed with daily news, tickers, traders, and best trades
 */

import { ScrollView, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';

export default function PopularFeedScreen() {
  const colors = useColors();

  return (
    <ScreenContainer className="p-0" containerClassName="bg-background">
      {/* Header */}
      <View className="px-6 py-4 flex-row items-center justify-between">
        <Text className="text-2xl font-bold text-accent">Ticksnap</Text>
        <View className="flex-row gap-4">
          <TouchableOpacity>
            <IconSymbol name="magnifyingglass" size={24} color={colors.foreground} />
          </TouchableOpacity>
          <TouchableOpacity>
            <IconSymbol name="bell.fill" size={24} color={colors.foreground} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Daily News Section */}
        <View className="px-6 py-4 gap-3">
          <Text className="text-lg font-bold text-foreground">Daily News</Text>
          <FlatList
            horizontal
            data={[1, 2, 3]}
            renderItem={({ item }) => (
              <View className="w-48 h-32 bg-surface rounded-lg mr-3 p-3 gap-2">
                <View className="w-full h-16 bg-border rounded-lg" />
                <Text className="text-xs text-muted line-clamp-2">Market Update</Text>
              </View>
            )}
            keyExtractor={(item) => item.toString()}
            scrollEnabled={false}
          />
        </View>

        {/* Stock News Section */}
        <View className="px-6 py-4 gap-3">
          <Text className="text-lg font-bold text-foreground">Stock News</Text>
          <FlatList
            horizontal
            data={['EUR/USD', 'MSFT', 'TSLA', 'AAPL', 'AMZN']}
            renderItem={({ item }) => (
              <TouchableOpacity className="bg-surface rounded-full px-4 py-2 mr-2 active:opacity-80">
                <Text className="text-sm font-semibold text-foreground">{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
            scrollEnabled={false}
          />
        </View>

        {/* Traders Section */}
        <View className="px-6 py-4 gap-3">
          <Text className="text-lg font-bold text-foreground">Top Traders</Text>
          <FlatList
            horizontal
            data={[1, 2, 3, 4, 5]}
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

        {/* Best Today Section */}
        <View className="px-6 py-4 gap-3">
          <Text className="text-lg font-bold text-foreground">Best Today</Text>
          <FlatList
            data={[1, 2, 3]}
            renderItem={({ item }) => (
              <TouchableOpacity className="bg-card rounded-lg p-4 mb-3 border border-border active:opacity-80">
                <View className="flex-row items-center gap-3 mb-3">
                  <View className="w-10 h-10 bg-accent rounded-full" />
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-foreground">Trader Name</Text>
                    <Text className="text-xs text-muted">2 hours ago</Text>
                  </View>
                </View>
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-sm font-semibold text-foreground">EUR/USD</Text>
                    <Text className="text-xs text-success">+$125.50</Text>
                  </View>
                  <TouchableOpacity className="bg-accent rounded-full px-4 py-2 active:opacity-80">
                    <Text className="text-background font-semibold text-xs">Like</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.toString()}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
