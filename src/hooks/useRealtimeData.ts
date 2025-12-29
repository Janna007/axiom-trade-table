"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import type { TokenData, PriceUpdate } from '@/types/token';
import { generateMockTokens, simulatePriceUpdate } from '@/data/mockTokens';

interface UseRealtimeDataOptions {
  updateInterval?: number;
  enabled?: boolean;
}

interface UseRealtimeDataReturn {
  data: TokenData[];
  loading: boolean;
  error: string | null;
  priceUpdates: Map<string, PriceUpdate>;
  refetch: () => void;
}

/**
 * Custom hook for simulating real-time WebSocket data updates
 * Provides price flashing effects when values change
 */
export function useRealtimeData(options: UseRealtimeDataOptions = {}): UseRealtimeDataReturn {
  const { updateInterval = 2000, enabled = true } = options;
  
  const [data, setData] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceUpdates, setPriceUpdates] = useState<Map<string, PriceUpdate>>(new Map());
  
  const previousDataRef = useRef<Map<string, TokenData>>(new Map());
  
  const fetchInitialData = useCallback(() => {
    setLoading(true);
    setError(null);
    
    // Simulate initial API fetch
    setTimeout(() => {
      try {
        const tokens = generateMockTokens(15);
        setData(tokens);
        
        // Store initial values for comparison
        tokens.forEach(token => {
          previousDataRef.current.set(token.token.id, token);
        });
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch token data');
        setLoading(false);
      }
    }, 800);
  }, []);
  
  const updatePrices = useCallback(() => {
    setData(prevData => {
      const newUpdates = new Map<string, PriceUpdate>();
      
      const updatedData = prevData.map(token => {
        // Randomly decide if this token gets updated (30% chance)
        if (Math.random() > 0.3) {
          const updatedToken = simulatePriceUpdate(token);
          const previousToken = previousDataRef.current.get(token.token.id);
          
          if (previousToken) {
            const previousValue = previousToken.metrics.marketCap;
            const newValue = updatedToken.metrics.marketCap;
            
            if (previousValue !== newValue) {
              newUpdates.set(token.token.id, {
                tokenId: token.token.id,
                field: 'marketCap',
                value: newValue,
                previousValue,
                direction: newValue > previousValue ? 'up' : 'down',
              });
            }
          }
          
          previousDataRef.current.set(token.token.id, updatedToken);
          return updatedToken;
        }
        return token;
      });
      
      // Set price updates for flash effect
      if (newUpdates.size > 0) {
        setPriceUpdates(newUpdates);
        
        // Clear updates after animation completes
        setTimeout(() => {
          setPriceUpdates(new Map());
        }, 600);
      }
      
      return updatedData;
    });
  }, []);
  
  // Initial data fetch
  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);
  
  // Real-time update simulation
  useEffect(() => {
    if (!enabled || loading) return;
    
    const interval = setInterval(updatePrices, updateInterval);
    
    return () => clearInterval(interval);
  }, [enabled, loading, updateInterval, updatePrices]);
  
  return {
    data,
    loading,
    error,
    priceUpdates,
    refetch: fetchInitialData,
  };
}
