"use client";

import { useState, useMemo, useCallback } from 'react';
import type { TokenData, SortConfig, SortField, SortDirection } from '@/types/token';

interface UseSortingReturn {
  sortedData: TokenData[];
  sortConfig: SortConfig;
  handleSort: (field: SortField) => void;
  resetSort: () => void;
}

const DEFAULT_SORT: SortConfig = {
  field: 'marketCap',
  direction: 'desc',
};

/**
 * Custom hook for table sorting functionality
 */
export function useSorting(data: TokenData[]): UseSortingReturn {
  const [sortConfig, setSortConfig] = useState<SortConfig>(DEFAULT_SORT);
  
  const handleSort = useCallback((field: SortField) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  }, []);
  
  const resetSort = useCallback(() => {
    setSortConfig(DEFAULT_SORT);
  }, []);
  
  const sortedData = useMemo(() => {
    const sorted = [...data];
    
    sorted.sort((a, b) => {
      let aValue: number;
      let bValue: number;
      
      switch (sortConfig.field) {
        case 'age':
          aValue = a.token.ageMs;
          bValue = b.token.ageMs;
          break;
        case 'marketCap':
          aValue = a.metrics.marketCap;
          bValue = b.metrics.marketCap;
          break;
        case 'liquidity':
          aValue = a.metrics.liquidity;
          bValue = b.metrics.liquidity;
          break;
        case 'volume':
          aValue = a.metrics.volume;
          bValue = b.metrics.volume;
          break;
        case 'txns':
          aValue = a.metrics.txns;
          bValue = b.metrics.txns;
          break;
        case 'holders':
          aValue = a.holders.holders;
          bValue = b.holders.holders;
          break;
        default:
          return 0;
      }
      
      const multiplier = sortConfig.direction === 'asc' ? 1 : -1;
      return (aValue - bValue) * multiplier;
    });
    
    return sorted;
  }, [data, sortConfig]);
  
  return {
    sortedData,
    sortConfig,
    handleSort,
    resetSort,
  };
}
