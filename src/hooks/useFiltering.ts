"use client";

import { useState, useMemo, useCallback } from 'react';
import type { TokenData, FilterConfig, TabType, TimeFilter } from '@/types/token';

interface UseFilteringReturn {
  filteredData: TokenData[];
  filterConfig: FilterConfig;
  setTab: (tab: TabType) => void;
  setTimeFilter: (time: TimeFilter) => void;
  setSearch: (search: string) => void;
  updateFilter: (partial: Partial<FilterConfig>) => void;
  resetFilters: () => void;
}

const DEFAULT_FILTER: FilterConfig = {
  tab: 'trending',
  timeFilter: '5m',
  search: '',
};

/**
 * Custom hook for table filtering functionality
 */
export function useFiltering(data: TokenData[]): UseFilteringReturn {
  const [filterConfig, setFilterConfig] = useState<FilterConfig>(DEFAULT_FILTER);
  
  const setTab = useCallback((tab: TabType) => {
    setFilterConfig(prev => ({ ...prev, tab }));
  }, []);
  
  const setTimeFilter = useCallback((timeFilter: TimeFilter) => {
    setFilterConfig(prev => ({ ...prev, timeFilter }));
  }, []);
  
  const setSearch = useCallback((search: string) => {
    setFilterConfig(prev => ({ ...prev, search }));
  }, []);
  
  const updateFilter = useCallback((partial: Partial<FilterConfig>) => {
    setFilterConfig(prev => ({ ...prev, ...partial }));
  }, []);
  
  const resetFilters = useCallback(() => {
    setFilterConfig(DEFAULT_FILTER);
  }, []);
  
  const filteredData = useMemo(() => {
    let result = [...data];
    
    // Search filter
    if (filterConfig.search) {
      const searchLower = filterConfig.search.toLowerCase();
      result = result.filter(
        token =>
          token.token.symbol.toLowerCase().includes(searchLower) ||
          token.token.name.toLowerCase().includes(searchLower)
      );
    }
    
    // Market cap filter
    if (filterConfig.minMarketCap !== undefined) {
      result = result.filter(token => token.metrics.marketCap >= filterConfig.minMarketCap!);
    }
    if (filterConfig.maxMarketCap !== undefined) {
      result = result.filter(token => token.metrics.marketCap <= filterConfig.maxMarketCap!);
    }
    
    // Liquidity filter
    if (filterConfig.minLiquidity !== undefined) {
      result = result.filter(token => token.metrics.liquidity >= filterConfig.minLiquidity!);
    }
    
    // Volume filter
    if (filterConfig.minVolume !== undefined) {
      result = result.filter(token => token.metrics.volume >= filterConfig.minVolume!);
    }
    
    // Verified only
    if (filterConfig.showVerifiedOnly) {
      result = result.filter(token => token.token.verified);
    }
    
    // Migrated only
    if (filterConfig.showMigratedOnly) {
      result = result.filter(token => token.status.migrated);
    }
    
    // Tab-based filtering (simulated)
    switch (filterConfig.tab) {
      case 'trending':
        result = result.sort((a, b) => b.views - a.views);
        break;
      case 'surge':
        result = result.sort((a, b) => b.metrics.marketCapChange - a.metrics.marketCapChange);
        break;
      case 'top':
        result = result.sort((a, b) => b.metrics.marketCap - a.metrics.marketCap);
        break;
      default:
        break;
    }
    
    return result;
  }, [data, filterConfig]);
  
  return {
    filteredData,
    filterConfig,
    setTab,
    setTimeFilter,
    setSearch,
    updateFilter,
    resetFilters,
  };
}
