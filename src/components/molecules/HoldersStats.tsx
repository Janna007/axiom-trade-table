"use client";

import React from 'react'
import { Users, Droplets } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface HoldersStatsProps {
    holders: number;
    lp: number;
    className?: string;
  }
  

export const HoldersStats=React.memo(function HoldersStats({
    holders,
    lp,
    className,
}:HoldersStatsProps) {
  return (
    <Tooltip>
    <TooltipTrigger asChild>
      <div className={cn('space-y-0.5 cursor-default text-sm', className)}>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Users className="h-3 w-3" />
          <span className="tabular-nums">{holders}</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Droplets className="h-3 w-3" />
          <span className="tabular-nums">{lp}</span>
        </div>
      </div>
    </TooltipTrigger>
    <TooltipContent side="top" className="text-xs">
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-4">
          <span>Token Holders</span>
          <span className="font-medium">{holders}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span>LP Providers</span>
          <span className="font-medium">{lp}</span>
        </div>
      </div>
    </TooltipContent>
  </Tooltip>
  )
})


