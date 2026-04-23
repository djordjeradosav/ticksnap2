/**
 * Create Trade Screen
 * Form for users to post new trades
 */

import { ScrollView, Text, TextInput, TouchableOpacity, View, Switch } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useTrades } from '@/hooks/useTrades';
import { useColors } from '@/hooks/use-colors';

export default function CreateTradeScreen() {
  const colors = useColors();
  const router = useRouter();
  const { createTrade, loading, error } = useTrades();

  const [ticker, setTicker] = useState('');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [entryPrice, setEntryPrice] = useState('');
  const [exitPrice, setExitPrice] = useState('');
  const [notes, setNotes] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const handleCreateTrade = async () => {
    if (!ticker || !entryPrice) {
      alert('Please fill in ticker and entry price');
      return;
    }

    try {
      const profitLoss = exitPrice
        ? parseFloat(exitPrice) - parseFloat(entryPrice)
        : null;

      await createTrade({
        ticker: ticker.toUpperCase(),
        trade_type: tradeType,
        entry_price: parseFloat(entryPrice),
        exit_price: exitPrice ? parseFloat(exitPrice) : null,
        profit_loss: profitLoss,
        notes,
        is_public: isPublic,
      });

      alert('Trade posted successfully!');
      router.back();
    } catch (err) {
      alert('Failed to create trade: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  return (
    <ScreenContainer className="p-6" containerClassName="bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-2xl font-bold text-foreground">Post Trade</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-2xl text-muted">×</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Ticker Input */}
        <View className="mb-4 gap-2">
          <Text className="text-sm font-semibold text-foreground">Ticker Symbol</Text>
          <TextInput
            className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
            placeholder="e.g., EUR/USD, MSFT, TSLA"
            placeholderTextColor={colors.muted}
            value={ticker}
            onChangeText={setTicker}
          />
        </View>

        {/* Trade Type Toggle */}
        <View className="mb-4 gap-2">
          <Text className="text-sm font-semibold text-foreground">Trade Type</Text>
          <View className="flex-row gap-3">
            <TouchableOpacity
              className={`flex-1 py-3 rounded-lg items-center ${
                tradeType === 'buy' ? 'bg-accent' : 'bg-surface border border-border'
              }`}
              onPress={() => setTradeType('buy')}
            >
              <Text
                className={`font-semibold ${
                  tradeType === 'buy' ? 'text-background' : 'text-foreground'
                }`}
              >
                BUY
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-3 rounded-lg items-center ${
                tradeType === 'sell' ? 'bg-accent' : 'bg-surface border border-border'
              }`}
              onPress={() => setTradeType('sell')}
            >
              <Text
                className={`font-semibold ${
                  tradeType === 'sell' ? 'text-background' : 'text-foreground'
                }`}
              >
                SELL
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Entry Price */}
        <View className="mb-4 gap-2">
          <Text className="text-sm font-semibold text-foreground">Entry Price</Text>
          <TextInput
            className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
            placeholder="0.00"
            placeholderTextColor={colors.muted}
            keyboardType="decimal-pad"
            value={entryPrice}
            onChangeText={setEntryPrice}
          />
        </View>

        {/* Exit Price */}
        <View className="mb-4 gap-2">
          <Text className="text-sm font-semibold text-foreground">Exit Price (Optional)</Text>
          <TextInput
            className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
            placeholder="0.00"
            placeholderTextColor={colors.muted}
            keyboardType="decimal-pad"
            value={exitPrice}
            onChangeText={setExitPrice}
          />
        </View>

        {/* Notes */}
        <View className="mb-4 gap-2">
          <Text className="text-sm font-semibold text-foreground">Notes (Optional)</Text>
          <TextInput
            className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground h-24"
            placeholder="Add your trade analysis or reasoning..."
            placeholderTextColor={colors.muted}
            multiline
            numberOfLines={4}
            value={notes}
            onChangeText={setNotes}
          />
        </View>

        {/* Public Toggle */}
        <View className="mb-6 flex-row items-center justify-between bg-surface rounded-lg p-4 border border-border">
          <Text className="text-sm font-semibold text-foreground">Make Public</Text>
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            trackColor={{ false: colors.border, true: '#F5C518' }}
            thumbColor={colors.foreground}
          />
        </View>

        {/* Error Message */}
        {error && (
          <View className="bg-error/10 border border-error rounded-lg p-3 mb-4">
            <Text className="text-error text-sm">{error}</Text>
          </View>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          className={`bg-accent rounded-lg py-4 items-center mb-4 ${loading ? 'opacity-50' : ''}`}
          onPress={handleCreateTrade}
          disabled={loading}
        >
          <Text className="text-background font-bold text-lg">
            {loading ? 'Posting...' : 'Post Trade'}
          </Text>
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity
          className="bg-surface border border-border rounded-lg py-4 items-center"
          onPress={() => router.back()}
          disabled={loading}
        >
          <Text className="text-foreground font-semibold">Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
}
