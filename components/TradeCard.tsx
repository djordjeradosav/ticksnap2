/**
 * TradeCard Component
 * Displays trade information with ticker, P&L, and user info
 */

import { Text, TouchableOpacity, View } from 'react-native';
import { Trade } from '@/lib/supabase';

interface TradeCardProps {
  trade: Trade;
  onPress?: () => void;
  onLike?: () => void;
}

export function TradeCard({ trade, onPress, onLike }: TradeCardProps) {
  const isProfit = trade.profit_loss && trade.profit_loss > 0;
  const profitColor = isProfit ? '#00C087' : '#FF4444';

  return (
    <TouchableOpacity
      className="bg-card rounded-lg p-4 mb-3 border border-border active:opacity-80"
      onPress={onPress}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-3 flex-1">
          <View className="w-10 h-10 bg-accent rounded-full" />
          <View className="flex-1">
            <Text className="text-sm font-semibold text-foreground">Trader</Text>
            <Text className="text-xs text-muted">2 hours ago</Text>
          </View>
        </View>
      </View>

      {/* Trade Info */}
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-sm font-semibold text-foreground">{trade.ticker}</Text>
          <Text className="text-xs" style={{ color: profitColor }}>
            {isProfit ? '+' : ''}${trade.profit_loss?.toFixed(2) || '0.00'}
          </Text>
        </View>
        <TouchableOpacity
          className="bg-accent rounded-full px-4 py-2 active:opacity-80"
          onPress={onLike}
        >
          <Text className="text-background font-semibold text-xs">Like</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
