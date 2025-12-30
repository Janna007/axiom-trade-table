"use client";

import { Token } from '@/types/token';
import React from 'react'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"

  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { cn } from '@/lib/utils';
import { Copy, ExternalLink, Globe, Key, MessageSquare, Search, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TokenInfoCellProps {
    token: Token;
    views?: number;
    className?: string;
  }
export const TokenInfoCell=React.memo(function TokenInfoCell({
    token,
    views=0,
    className
}:TokenInfoCellProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* Token Avatar with Status */}
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="relative cursor-pointer">
            <Avatar className="h-10 w-10 rounded-lg border border-border">
              <AvatarImage src={token.image} alt={token.symbol} />
              <AvatarFallback className="rounded-lg bg-secondary text-xs">
                {token.symbol.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            {/* <StatusIndicator
              status="online"
              className="absolute -bottom-0.5 -left-0.5"
            /> */}
          </div>
        </HoverCardTrigger>
        <HoverCardContent 
          side="right" 
          className="w-72 bg-background border-border"
          sideOffset={8}
        >
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Avatar className="h-12 w-12 rounded-lg border border-border">
                <AvatarImage src={token.image} alt={token.symbol} />
                <AvatarFallback className="rounded-lg bg-secondary">
                  {token.symbol.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{token.symbol}</span>
                  {token.verified && (
                    <Shield className="h-4 w-4 text-info" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{token.name}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Contract</span>
                <div className="flex items-center gap-1">
                  <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">
                    {token.contractAddress}
                  </code>
                  <Copy className="h-3 w-3 text-muted-foreground cursor-pointer hover:text-foreground" />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Chain</span>
                <Badge variant="secondary" className="text-xs">
                  {token.chain}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Age</span>
                <span className="text-foreground">{token.age}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <a
                href="#"
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <Globe className="h-3 w-3" />
                Website
              </a>
              <a
                href="#"
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <MessageSquare className="h-3 w-3" />
                Twitter
              </a>
              <a
                href="#"
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <ExternalLink className="h-3 w-3" />
                DEX
              </a>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>

      {/* Token Info */}
      <div className="flex flex-col gap-0.5 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground truncate max-w-30">
            {token.symbol}
          </span>
          <span className="text-muted-foreground text-sm truncate max-w-25">
            {token.name}
          </span>
          {token.verified && (
            <Shield className="h-3.5 w-3.5 text-info shrink-0" />
          )}
        </div>
        
        <div className="flex items-center gap-2 text-xs">
          <span className="text-success font-medium">{token.age}</span>
          
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="h-5 px-1.5 text-[10px] bg-success/10 text-success border-success/30">
              USD1
            </Badge>
          </div>
          
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Key className="h-3 w-3 cursor-pointer hover:text-foreground" />
            <MessageSquare className="h-3 w-3 cursor-pointer hover:text-foreground" />
            <Search className="h-3 w-3 cursor-pointer hover:text-foreground" />
            <span className="flex items-center gap-0.5">
              <Search className="h-3 w-3" />
              {views}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
})


