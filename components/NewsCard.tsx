/**
 * NewsCard Component
 * Displays news article with image, headline, and source
 */

import { Text, TouchableOpacity, View } from 'react-native';
import { NewsArticle } from '@/lib/supabase';

interface NewsCardProps {
  article: NewsArticle;
  onPress?: () => void;
}

export function NewsCard({ article, onPress }: NewsCardProps) {
  return (
    <TouchableOpacity
      className="w-48 h-32 bg-surface rounded-lg mr-3 p-3 gap-2 border border-border active:opacity-80"
      onPress={onPress}
    >
      {/* Image Placeholder */}
      <View className="w-full h-16 bg-border rounded-lg" />

      {/* Content */}
      <View className="flex-1 justify-between">
        <Text className="text-xs text-foreground font-semibold line-clamp-2">
          {article.title}
        </Text>
        <Text className="text-xs text-muted">{article.source.name}</Text>
      </View>
    </TouchableOpacity>
  );
}
