/**
 * TradeModal Component
 * Bottom sheet modal for displaying full trade details
 */

import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Trade } from '@/lib/supabase';

interface TradeModalProps {
  trade: Trade;
  visible: boolean;
  onClose: () => void;
  onLike: () => void;
}

export function TradeModal({ trade, visible, onClose, onLike }: TradeModalProps) {
  if (!visible) return null;

  const isProfit = trade.profit_loss && trade.profit_loss > 0;
  const profitColor = isProfit ? '#00C087' : '#FF4444';

  return (
    <View className="absolute inset-0 bg-overlay">
      <TouchableOpacity
        className="flex-1"
        onPress={onClose}
        activeOpacity={1}
      />

      {/* Bottom Sheet */}
      <View className="bg-surface rounded-t-3xl p-6 gap-4 max-h-4/5">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-bold text-foreground">Trade Details</Text>
          <TouchableOpacity onPress={onClose}>
            <Text className="text-2xl text-muted">×</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Trader Info */}
          <View className="flex-row items-center gap-3 mb-4">
            <View className="w-12 h-12 bg-accent rounded-full" />
            <View className="flex-1">
              <Text className="text-sm font-semibold text-foreground">Trader Name</Text>
              <Text className="text-xs text-muted">2 hours ago</Text>
            </View>
          </View>

          {/* Description */}
          <View className="mb-4">
            <Text className="text-xs font-semibold text-muted uppercase mb-2">Description</Text>
            <Text className="text-sm text-foreground leading-relaxed">
              {trade.notes || 'No description provided'}
            </Text>
          </View>

          {/* Chart Placeholder */}
          <View className="bg-card rounded-lg h-40 mb-4 border border-border items-center justify-center">
            <Text className="text-muted">Chart Preview</Text>
          </View>

          {/* Trade Info */}
          <View className="bg-card rounded-lg p-4 mb-4 border border-border gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-muted">Ticker</Text>
              <Text className="text-sm font-semibold text-foreground">{trade.ticker}</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-muted">Type</Text>
              <Text className="text-sm font-semibold text-foreground uppercase">
                {trade.trade_type}
              </Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-muted">Entry Price</Text>
              <Text className="text-sm font-semibold text-foreground">
                ${trade.entry_price?.toFixed(4) || '0.0000'}
              </Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-muted">P&L</Text>
              <Text className="text-sm font-semibold" style={{ color: profitColor }}>
                {isProfit ? '+' : ''}${trade.profit_loss?.toFixed(2) || '0.00'}
              </Text>
            </View>
          </View>

          {/* Like Button */}
          <TouchableOpacity
            className="bg-accent rounded-full py-4 active:opacity-80"
            onPress={onLike}
          >
            <Text className="text-background font-bold text-center">
              Like this trade ({trade.likes_count})
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
