/**
 * Popular Feed Screen
 * Main screen showing news, categories, and best trades
 */

import { ScrollView, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { TickerBadge } from '@/components/TickerBadge';

// Mock data
const newsData = [
  { id: '1', title: 'Unlimited. Forecast', subtitle: 'Watch unlimited number of trades at the same time' },
];

const categories = [
  { id: '1', name: 'Big Bag', icon: '🟡', color: '#F5C518' },
  { id: '2', name: 'Racks', icon: '🟢', color: '#00C087' },
  { id: '3', name: 'Ticker', icon: '🟣', color: '#9C27B0' },
  { id: '4', name: 'Wings', icon: '🔵', color: '#2196F3' },
];

const bestTrades = [
  { id: '1', price: '+$45.00', ticker: 'EURGBP', trader: 'Kimmel' },
  { id: '2', price: '+$32.50', ticker: 'GBPUSD', trader: 'Jessy' },
  { id: '3', price: '+$28.00', ticker: 'EURUSD', trader: 'Dan' },
];

export default function PopularFeedScreen() {
  return (
    <ScreenContainer className="bg-white" containerClassName="bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between pb-4 border-b border-border px-4">
        <Text className="text-2xl font-bold text-black">Ticksnap</Text>
        <TouchableOpacity>
          <Text className="text-2xl">🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="py-4">
        {/* Daily News Section */}
        <View className="mb-6 px-4">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-base font-bold text-black">Daily News</Text>
            <View className="flex-row gap-2">
              <TouchableOpacity><Text className="text-lg">←</Text></TouchableOpacity>
              <TouchableOpacity><Text className="text-lg">→</Text></TouchableOpacity>
            </View>
          </View>

          {/* News Card */}
          <View className="bg-black rounded-lg p-4 h-40 justify-between">
            <View>
              <Text className="text-white text-lg font-bold">Unlimited. Forecast</Text>
              <Text className="text-white/70 text-sm mt-1">Watch unlimited number of trades at the same time</Text>
            </View>
            <View className="flex-row gap-1 justify-center">
              <View className="w-2 h-2 rounded-full bg-accent" />
              <View className="w-2 h-2 rounded-full bg-white/30" />
              <View className="w-2 h-2 rounded-full bg-white/30" />
            </View>
          </View>
        </View>

        {/* Category Icons */}
        <View className="mb-6">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="items-center mr-4" style={{ marginLeft: item.id === '1' ? 16 : 0 }}>
                <TouchableOpacity
                  className="w-16 h-16 rounded-lg items-center justify-center mb-2"
                  style={{ backgroundColor: item.color }}
                >
                  <Text className="text-2xl">{item.icon}</Text>
                </TouchableOpacity>
                <Text className="text-xs font-semibold text-black text-center">{item.name}</Text>
              </View>
            )}
            scrollEnabled={true}
          />
        </View>

        {/* Best Today Section */}
        <View className="mb-6 px-4">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-base font-bold text-black">Best Today</Text>
            <TouchableOpacity>
              <Text className="text-lg text-black">→</Text>
            </TouchableOpacity>
          </View>

          {/* Best Trades Horizontal Scroll */}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={bestTrades}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="mr-3">
                <View className="bg-black rounded-lg w-32 h-24 justify-center items-center">
                  <Text className="text-white text-xs">📊</Text>
                </View>
                <Text className="text-black font-bold text-sm mt-2">{item.price}</Text>
                <View className="flex-row gap-1 mt-1">
                  <TickerBadge label={item.ticker} size="sm" />
                </View>
                <Text className="text-muted text-xs mt-1">by {item.trader}</Text>
              </View>
            )}
            scrollEnabled={true}
          />
        </View>

        <View className="h-20" />
      </ScrollView>
    </ScreenContainer>
  );
}
