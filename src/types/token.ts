

export type Chain = "SOL" | "ETH" | "BSC";
export interface Token {
    id: string;
    symbol: string;
    name: string;
    image: string;
    age: string;
    ageMs: number;
    verified: boolean;
    chain: Chain;
    contractAddress: string;
  }
  
  export interface TokenMetrics {
    marketCap: number;
    marketCapChange: number;
    liquidity: number;
    volume: number;
    txns: number;
    buys: number;
    sells: number;
  }
  
  export interface TokenHolders {
    top10Percent: number;
    devPercent: number;
    sniperPercent: number;
    insiderPercent: number;
    holders: number;
    lp: number;
  }
  
  export interface TokenStatus {
    bundled: boolean;
    paid: boolean;
    migrated: boolean;
    rugged: boolean;
  }
  
  export interface ChartPoint {
    timestamp: number;
    price: number;
  }

  
export interface TokenData {
    token: Token;
    metrics: TokenMetrics;
    holders: TokenHolders;
    status: TokenStatus;
    chart: ChartPoint[];
    views: number;
  }
  
  export type SortField = 
    | 'age' 
    | 'marketCap' 
    | 'liquidity' 
    | 'volume' 
    | 'txns' 
    | 'holders';
  
  export type SortDirection = 'asc' | 'desc';
  
  export interface SortConfig {
    field: SortField;
    direction: SortDirection;
  }

  export type TabType = 'top' | 'trending' | 'surge' | 'dex-screener' | 'pump-live';

export type TimeFilter = '1m' | '5m' | '30m' | '1h';

export interface FilterConfig {
  tab: TabType;
  timeFilter: TimeFilter;
  search: string;
  minMarketCap?: number;
  maxMarketCap?: number;
  minLiquidity?: number;
  minVolume?: number;
  showVerifiedOnly?: boolean;
  showMigratedOnly?: boolean;
}

export interface PriceUpdate {
  tokenId: string;
  field: keyof TokenMetrics;
  value: number;
  previousValue: number;
  direction: 'up' | 'down';
}