"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Token } from '@/types/token';
import PrimaryButton from '../atoms/button';

interface BuyButtonProps {
  token: Token;
  className?: string;
}

/**
 * Buy button with modal dialog for trade confirmation
 */
export const BuyButton = React.memo(function BuyButton({
  token,
  className,
}: BuyButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6"
        >
          Buy
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Buy {token.symbol}
          </DialogTitle>
          <DialogDescription>
            Enter the amount you want to purchase. Make sure to review the transaction details.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount (SOL)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              className="bg-muted border-border"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="slippage">Slippage Tolerance (%)</Label>
            <Input
              id="slippage"
              type="number"
              defaultValue="1"
              className="bg-muted border-border"
            />
          </div>
          <div className="rounded-lg bg-muted p-3 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Token</span>
              <span className="font-medium">{token.symbol}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Contract</span>
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                {token.contractAddress}
              </code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Network</span>
              <span className="font-medium">{token.chain}</span>
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <PrimaryButton title='Cancle' className="border-border" isActive={false}  />
          </DialogClose>
          <PrimaryButton title=' Confirm Purchase' className='ml-1' isActive={true} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
