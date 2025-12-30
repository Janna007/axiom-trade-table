"use client";

import { cn } from '@/lib/utils';
import React from 'react'

interface PercentChangeProps {
    value: number;
    showSign?: boolean;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
  }
  

export const PercentChange=React.memo(function PercentChange({
    value,
    showSign = true,
    className,
    size = 'md',
}:PercentChangeProps) {
    const isPositive = value >= 0;
    const sign = showSign && isPositive ? '+' : '';
    
    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };
  return (
    <span
      className={cn(
        'font-medium tabular-nums transition-colors duration-200',
        sizeClasses[size],
        isPositive ? 'text-success' : 'text-danger',
        className
      )}
    >
      {sign}{value.toFixed(2)}%
    </span>
  )
})


