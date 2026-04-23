/**
 * Forecast Screen
 * Interactive charts and best trades leaderboard\n */

import { ScrollView, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';

export default function ForecastScreen() {
  const colors = useColors();

  return (
    <ScreenContainer className="p-6" containerClassName="bg-background">
      {/* Header */}
      <Text className="text-2xl font-bold text-foreground mb-6">Forecast</Text>

      {/* Chart Area */}
      <View className="bg-surface rounded-lg p-4 mb-6 border border-border h-48 items-center justify-center">
        <Text className="text-muted">Interactive Chart</Text>
        <Text className="text-xs text-muted mt-2">Chart visualization coming soon</Text>
      </View>

      {/* Instrument Selector */}
      <View className="mb-6 gap-3">
        <Text className="text-sm font-semibold text-foreground">Select Instrument</Text>
        <FlatList
          data={['EUR/USD', 'GBP/USD', 'USD/JPY', 'MSFT', 'TSLA', 'AAPL']}
          renderItem={({ item }) => (
            <TouchableOpacity className="bg-card rounded-lg p-3 mb-2 border border-border active:opacity-80">
              <Text className="text-sm font-semibold text-foreground">{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          scrollEnabled={false}
        />
      </View>

      {/* Best Trades Leaderboard */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-3">
          <Text className="text-lg font-bold text-foreground">Best Trades</Text>
          <FlatList
            data={[1, 2, 3, 4, 5]}
            renderItem={({ item }) => (
              <TouchableOpacity className="bg-card rounded-lg p-4 mb-3 border border-border active:opacity-80">
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center gap-3 flex-1">
                    <View className="w-10 h-10 bg-accent rounded-full" />
                    <View className="flex-1">
                      <Text className="text-sm font-semibold text-foreground">Trader {item}</Text>
                      <Text className="text-xs text-muted">2 hours ago</Text>
                    </View>
                  </View>
                  <View className="bg-success/20 rounded-lg px-2 py-1">
                    <Text className="text-xs font-semibold text-success">+$250</Text>
                  </View>
                </View>
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-sm font-semibold text-foreground">EUR/USD</Text>
                    <Text className="text-xs text-muted">BUY @ 1.0850</Text>
                  </View>
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
