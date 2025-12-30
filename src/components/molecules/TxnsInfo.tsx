import React from 'react'

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { cn } from '@/lib/utils';

interface TxnsInfoProps {
    total: number;
    buys: number;
    sells: number;
    className?: string;
  }

  
export const TxnsInfo=React.memo(function TxnsInfo(
    {
        total,
        buys,
        sells,
        className,
    }:TxnsInfoProps
) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={cn('cursor-default', className)}>
          <div className="font-medium tabular-nums">{total}</div>
          <div className="flex items-center gap-1 text-xs tabular-nums">
            <span className="text-success">{buys}</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-danger">{sells}</span>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs bg-background text-foreground">
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4">
            <span>Total Transactions</span>
            <span className="font-medium">{total}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-success">Buys</span>
            <span className="font-medium">{buys}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-danger">Sells</span>
            <span className="font-medium">{sells}</span>
          </div>
          <div className="flex items-center justify-between gap-4 pt-1 border-t border-border">
            <span>Buy/Sell Ratio</span>
            <span className={cn(
              'font-medium',
              buys > sells ? 'text-success' : 'text-danger'
            )}>
              {(buys / sells).toFixed(2)}
            </span>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  )
})


