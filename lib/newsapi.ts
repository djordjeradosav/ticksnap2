/**
 * NewsAPI Integration
 * Fetch financial and trading news
 */

import axios from 'axios';
import { NewsArticle } from './supabase';

const NEWSAPI_KEY = process.env.EXPO_PUBLIC_NEWSAPI_KEY || '';
const NEWSAPI_BASE = 'https://newsapi.org/v2';

if (!NEWSAPI_KEY) {
  console.warn('NewsAPI key not configured. Please set EXPO_PUBLIC_NEWSAPI_KEY');
}

const newsApiClient = axios.create({
  baseURL: NEWSAPI_BASE,
  params: {
    apiKey: NEWSAPI_KEY,
  },
});

/**
 * Fetch news articles for a specific query
 */
export async function fetchNews(query: string, limit: number = 10): Promise<NewsArticle[]> {
  try {
    const response = await newsApiClient.get('/everything', {
      params: {
        q: query,
        sortBy: 'publishedAt',
        language: 'en',
        pageSize: limit,
      },
    });

    return response.data.articles || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

/**
 * Fetch finance/stock news
 */
export async function fetchFinanceNews(limit: number = 10): Promise<NewsArticle[]> {
  return fetchNews('stocks finance trading', limit);
}

/**
 * Fetch news for a specific stock ticker
 */
export async function fetchStockNews(ticker: string, limit: number = 10): Promise<NewsArticle[]> {
  return fetchNews(ticker, limit);
}

/**
 * Fetch news for a currency pair
 */
export async function fetchCurrencyNews(pair: string, limit: number = 10): Promise<NewsArticle[]> {
  return fetchNews(pair, limit);
}
