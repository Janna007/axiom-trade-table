"use client";

import { TokenHolders } from "@/types/token";
import React from "react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { cn } from "@/lib/utils";


interface TokenHoldersInfoProps {
    holders: TokenHolders;
    className?: string;
  }

export const TokenHoldersInfo = React.memo(function TokenHoldersInfo({
  holders,
  className,
}:TokenHoldersInfoProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={cn('cursor-pointer space-y-0.5', className)}>
          {/* Top row - token distribution */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-token-holder">
              🔴 {holders.top10Percent.toFixed(2)}%
            </span>
            <span className="text-muted-foreground">
              🔵 {holders.devPercent}%
            </span>
          </div>
          
          {/* Second row */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">
              🟡 {holders.sniperPercent}%
            </span>
            <span className="text-muted-foreground">
              🟣 {holders.insiderPercent}%
            </span>
          </div>
          
          {/* Third row */}
          <div className="flex items-center gap-2 text-xs">
            <span className={cn(
              holders.top10Percent > 20 ? 'text-danger' : 'text-muted-foreground'
            )}>
              {holders.top10Percent > 20 ? '⚠️ Unpaid' : '✅ Paid'}
            </span>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent 
        side="left" 
        className="w-64 bg-background border-border"
        sideOffset={8}
      >
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-foreground">Token Distribution</h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5">
                <span className="text-token-holder">🔴</span>
                Top 10 Holders
              </span>
              <span className="font-medium">{holders.top10Percent.toFixed(2)}%</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5">
                <span className="text-info">🔵</span>
                Dev Holdings
              </span>
              <span className="font-medium">{holders.devPercent}%</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5">
                <span className="text-warning">🟡</span>
                Sniper Holdings
              </span>
              <span className="font-medium">{holders.sniperPercent.toFixed(2)}%</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5">
                <span className="text-token-sniper">🟣</span>
                Insider Holdings
              </span>
              <span className="font-medium">{holders.insiderPercent}%</span>
            </div>
          </div>
          
          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Holders</span>
              <span className="font-medium">{holders.holders}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">LP Providers</span>
              <span className="font-medium">{holders.lp}</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
});
