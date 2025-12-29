/**
 * Mock data generator for token trading table
 */
import type { TokenData, ChartPoint } from '@/types/token';
import { randomInRange, randomIntInRange } from '@/utils/format';

const TOKEN_NAMES = [
  { symbol: 'TARIFFCOIN', name: 'Tariffcoin' },
  { symbol: 'LMEOW', name: 'The GCR Pro...' },
  { symbol: 'PIMP', name: 'PimpFun' },
  { symbol: 'EDGAR', name: 'EDGAR' },
  { symbol: 'LOS', name: 'LAUNCH ON S...' },
  { symbol: 'AETHER', name: 'Aether Protocol' },
  { symbol: 'MOONCAT', name: 'Moon Cat' },
  { symbol: 'DEGEN', name: 'DegenSwap' },
  { symbol: 'PUMP', name: 'PumpIt Finance' },
  { symbol: 'WOJAK', name: 'Wojak Token' },
  { symbol: 'PEPE2', name: 'Pepe 2.0' },
  { symbol: 'SHIB3', name: 'Shiba 3.0' },
  { symbol: 'BONK2', name: 'Bonk 2' },
  { symbol: 'FLOKI2', name: 'Floki 2.0' },
  { symbol: 'ELON', name: 'Elon Mars' },
];

const TOKEN_IMAGES = [
  'https://api.dicebear.com/7.x/shapes/svg?seed=1&backgroundColor=0f172a',
  'https://api.dicebear.com/7.x/shapes/svg?seed=2&backgroundColor=1e293b',
  'https://api.dicebear.com/7.x/shapes/svg?seed=3&backgroundColor=334155',
  'https://api.dicebear.com/7.x/shapes/svg?seed=4&backgroundColor=475569',
  'https://api.dicebear.com/7.x/shapes/svg?seed=5&backgroundColor=64748b',
  'https://api.dicebear.com/7.x/shapes/svg?seed=6&backgroundColor=22c55e',
  'https://api.dicebear.com/7.x/shapes/svg?seed=7&backgroundColor=ef4444',
  'https://api.dicebear.com/7.x/shapes/svg?seed=8&backgroundColor=3b82f6',
  'https://api.dicebear.com/7.x/shapes/svg?seed=9&backgroundColor=a855f7',
  'https://api.dicebear.com/7.x/shapes/svg?seed=10&backgroundColor=f59e0b',
];

function generateChartData(points = 20, trend: 'up' | 'down' | 'neutral' = 'neutral'): ChartPoint[] {
  const now = Date.now();
  const data: ChartPoint[] = [];
  let price = randomInRange(0.001, 1);
  
  const trendMultiplier = trend === 'up' ? 1.02 : trend === 'down' ? 0.98 : 1;
  
  for (let i = 0; i < points; i++) {
    const volatility = randomInRange(-0.05, 0.05);
    price = price * (trendMultiplier + volatility);
    price = Math.max(0.0001, price);
    
    data.push({
      timestamp: now - (points - i) * 60000,
      price,
    });
  }
  
  return data;
}

function generateRandomAge(): { age: string; ageMs: number } {
  const minutes = randomIntInRange(1, 720);
  const ageMs = minutes * 60 * 1000;
  
  if (minutes < 60) {
    return { age: `${minutes}m`, ageMs };
  }
  const hours = Math.floor(minutes / 60);
  return { age: `${hours}h`, ageMs };
}

export function generateMockToken(index: number): TokenData {
  const tokenInfo = TOKEN_NAMES[index % TOKEN_NAMES.length];
  const { age, ageMs } = generateRandomAge();
  const marketCapChange = randomInRange(-25, 150);
  const trend = marketCapChange > 5 ? 'up' : marketCapChange < -5 ? 'down' : 'neutral';
  
  return {
    token: {
      id: `token-${index}-${Date.now()}`,
      symbol: tokenInfo.symbol,
      name: tokenInfo.name,
      image: TOKEN_IMAGES[index % TOKEN_IMAGES.length],
      age,
      ageMs,
      verified: Math.random() > 0.7,
      chain: 'SOL',
      contractAddress: `${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`,
    },
    metrics: {
      marketCap: randomInRange(5000, 5000000),
      marketCapChange,
      liquidity: randomInRange(5000, 500000),
      volume: randomInRange(1000, 100000),
      txns: randomIntInRange(50, 500),
      buys: randomIntInRange(50, 300),
      sells: randomIntInRange(20, 200),
    },
    holders: {
      top10Percent: randomInRange(10, 35),
      devPercent: randomInRange(0, 5),
      sniperPercent: randomInRange(0, 25),
      insiderPercent: randomInRange(0, 5),
      holders: randomIntInRange(50, 5000),
      lp: randomIntInRange(20, 500),
    },
    status: {
      bundled: Math.random() > 0.7,
      paid: Math.random() > 0.5,
      migrated: Math.random() > 0.8,
      rugged: Math.random() > 0.95,
    },
    chart: generateChartData(20, trend),
    views: randomIntInRange(50, 1000),
  };
}

export function generateMockTokens(count = 15): TokenData[] {
  return Array.from({ length: count }, (_, i) => generateMockToken(i));
}

/**
 * Simulate a price update for real-time data
 */
export function simulatePriceUpdate(token: TokenData): TokenData {
  const change = randomInRange(-0.1, 0.1);
  const newMarketCap = Math.max(1000, token.metrics.marketCap * (1 + change));
  const newMarketCapChange = token.metrics.marketCapChange + randomInRange(-2, 2);
  
  // Update chart with new point
  const newChart = [...token.chart.slice(1)];
  const lastPrice = token.chart[token.chart.length - 1]?.price || 0.001;
  newChart.push({
    timestamp: Date.now(),
    price: lastPrice * (1 + change),
  });
  
  return {
    ...token,
    metrics: {
      ...token.metrics,
      marketCap: newMarketCap,
      marketCapChange: newMarketCapChange,
      volume: token.metrics.volume + randomInRange(0, 500),
      txns: token.metrics.txns + randomIntInRange(0, 5),
      buys: token.metrics.buys + randomIntInRange(0, 3),
      sells: token.metrics.sells + randomIntInRange(0, 2),
    },
    chart: newChart,
  };
}
