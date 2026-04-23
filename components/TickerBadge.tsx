/**
 * TickerBadge Component
 * Displays ticker symbol with color based on P&L
 */

import { Text, View } from 'react-native';

interface TickerBadgeProps {
  ticker: string;
  profitLoss?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function TickerBadge({ ticker, profitLoss, size = 'md' }: TickerBadgeProps) {
  const isProfit = profitLoss && profitLoss > 0;
  const backgroundColor = isProfit ? '#00C087' : profitLoss ? '#FF4444' : '#F5C518';

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  return (
    <View
      className={`rounded-full ${sizeClasses[size]}`}
      style={{ backgroundColor }}
    >
      <Text className="font-bold text-background text-center">
        {ticker}
        {profitLoss && profitLoss > 0 && ' ↑'}
        {profitLoss && profitLoss < 0 && ' ↓'}
      </Text>
    </View>
  );
}
