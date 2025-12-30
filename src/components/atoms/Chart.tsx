"use client";

import { cn } from '@/lib/utils';
import { ChartPoint } from '@/types/token';
import React, { useMemo } from 'react'

interface ChartProps {
    data:ChartPoint[];
    width:number
    height:number
    className?:string

}
export const Chart=React.memo(function Chart({
    data,
    width,
    height,
    className
}:ChartProps) {
    const { path, color, gradient } = useMemo(() => {
        if (data.length < 2) {
          return { path: '', color: 'hsl(var(--chart-neutral))', gradient: 'neutral' };
        }
    
        const prices = data.map(d => d.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const priceRange = maxPrice - minPrice || 1;
    
        // Normalize prices to chart dimensions
        const padding = 2;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
    
        const points = data.map((point, index) => {
          const x = padding + (index / (data.length - 1)) * chartWidth;
          const y = padding + chartHeight - ((point.price - minPrice) / priceRange) * chartHeight;
          return { x, y };
        });
    
        // Create smooth SVG path
        const pathData = points.reduce((acc, point, index) => {
          if (index === 0) return `M ${point.x} ${point.y}`;
          return `${acc} L ${point.x} ${point.y}`;
        }, '');
    
        // Determine color based on trend
        const firstPrice = prices[0];
        const lastPrice = prices[prices.length - 1];
        const isUp = lastPrice >= firstPrice;
    
        return {
          path: pathData,
          color: isUp ? 'hsl(var(--chart-up))' : 'hsl(var(--chart-down))',
          gradient: isUp ? 'up' : 'down',
        };
      }, [data, width, height]);


      if (data.length < 2) {
        return (
          <div
            className={cn('flex items-center justify-center', className)}
            style={{ width, height }}
          >
            <div className="h-px w-full bg-muted" />
          </div>
        );
      }
    
      const gradientId = `chart-gradient-${gradient}-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className={cn('overflow-visible', className)}
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Area fill */}
          <path
            d={`${path} L ${width - 2} ${height - 2} L 2 ${height - 2} Z`}
            fill={`url(#${gradientId})`}
          />
          {/* Line */}
          <path
            d={path}
            fill="none"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
})


