/**
 * Format utilities for trading table
 */

/**
 * Format number to abbreviated form (e.g., 1.5K, 2.3M)
 */
export function formatNumber(num: number): string {
    if (num >= 1_000_000_000) {
      return `${(num / 1_000_000_000).toFixed(2)}B`;
    }
    if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(2)}M`;
    }
    if (num >= 1_000) {
      return `${(num / 1_000).toFixed(1)}K`;
    }
    return num.toFixed(0);
  }
  
  /**
   * Format currency value with $ prefix
   */
  export function formatCurrency(num: number): string {
    return `$${formatNumber(num)}`;
  }
  
  /**
   * Format percentage with sign
   */
  export function formatPercent(num: number, showSign = true): string {
    const sign = showSign && num > 0 ? '+' : '';
    return `${sign}${num.toFixed(2)}%`;
  }
  
  /**
   * Format time ago from milliseconds
   */
  export function formatTimeAgo(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return `${seconds}s`;
  }
  
  /**
   * Format address to shortened form
   */
  export function formatAddress(address: string, chars = 4): string {
    if (address.length <= chars * 2 + 3) return address;
    return `${address.slice(0, chars)}...${address.slice(-chars)}`;
  }
  
  /**
   * Generate random number within range
   */
  export function randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
  
  /**
   * Generate random integer within range
   */
  export function randomIntInRange(min: number, max: number): number {
    return Math.floor(randomInRange(min, max));
  }
  
  /**
   * Clamp number between min and max
   */
  export function clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
  }
  