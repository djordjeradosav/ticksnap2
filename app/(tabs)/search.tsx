/**
 * Search Screen
 * Search traders, stocks, and currencies
 */

import { ScrollView, Text, TextInput, View, TouchableOpacity, FlatList } from 'react-native';
import { useState } from 'react';
import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';

export default function SearchScreen() {
  const colors = useColors();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = ['All', 'Traders', 'Stocks', 'Currencies'];

  return (
    <ScreenContainer className="p-6" containerClassName="bg-background">
      {/* Header */}
      <Text className="text-2xl font-bold text-foreground mb-6">Search</Text>

      {/* Search Bar */}
      <View className="flex-row items-center bg-surface border border-border rounded-lg px-4 py-3 mb-6 gap-2">
        <IconSymbol name="magnifyingglass" size={20} color={colors.muted} />
        <TextInput
          className="flex-1 text-foreground"
          placeholder="Search traders, stocks, currencies..."
          placeholderTextColor={colors.muted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-6"
        contentContainerStyle={{ gap: 8 }}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            className={`px-4 py-2 rounded-full ${
              activeFilter === filter.toLowerCase()
                ? 'bg-accent'
                : 'bg-surface border border-border'
            }`}
            onPress={() => setActiveFilter(filter.toLowerCase())}
          >
            <Text
              className={`font-semibold text-sm ${
                activeFilter === filter.toLowerCase()
                  ? 'text-background'
                  : 'text-foreground'
              }`}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {searchQuery ? (
          <FlatList
            data={[1, 2, 3, 4]}
            renderItem={({ item }) => (
              <TouchableOpacity className="bg-card rounded-lg p-4 mb-3 border border-border flex-row items-center gap-3 active:opacity-80">
                <View className="w-12 h-12 bg-accent rounded-full" />
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-foreground">Result {item}</Text>
                  <Text className="text-xs text-muted">Trader • 1.2K followers</Text>
                </View>
                <TouchableOpacity className="bg-accent rounded-full px-3 py-1">
                  <Text className="text-background font-semibold text-xs">Follow</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.toString()}
            scrollEnabled={false}
          />
        ) : (
          <View className="items-center justify-center py-12 gap-3">
            <IconSymbol name="magnifyingglass" size={48} color={colors.muted} />
            <Text className="text-muted text-center">Search for traders, stocks, or currencies</Text>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
