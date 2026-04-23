/**
 * Sample trading instruments for Ticksnap
 */

export const FOREX_PAIRS = [
  'EUR/USD',
  'GBP/USD',
  'USD/JPY',
  'EUR/GBP',
  'AUD/USD',
  'USD/CAD',
  'NZD/USD',
  'EUR/JPY',
] as const;

export const STOCKS = [
  'NVDA',
  'MSFT',
  'TSLA',
  'AAPL',
  'AMZN',
  'GOOGL',
  'META',
  'MPLX',
] as const;

export const CRYPTO = [
  'BTC/USD',
  'ETH/USD',
  'XRP/USD',
  'SOL/USD',
] as const;

export const ALL_TICKERS = [...FOREX_PAIRS, ...STOCKS, ...CRYPTO] as const;

export type Ticker = (typeof ALL_TICKERS)[number];
