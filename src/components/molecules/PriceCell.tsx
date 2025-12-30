"use client";
import { cn } from "@/lib/utils";
import { formatCurrency, formatNumber } from "@/utils/format";
import React, { useEffect, useState } from "react";

interface PriceCellProps {
  value: number;
  previousValue?: number;
  type?: "currency" | "number";
  className?: string;
}

export const PriceCell = React.memo(function PriceCell({
  value,
  previousValue,
  type = "currency",
  className,
}: PriceCellProps) {

    const [flashClass, setFlashClass] = useState<string>('');

      
//   useEffect(() => {
//     if (previousValue !== undefined && previousValue !== value) {
//       const direction = value > previousValue ? 'price-flash-up' : 'price-flash-down';
//       setFlashClass(direction);
      
//       const timer = setTimeout(() => setFlashClass(''), 600);
//       return () => clearTimeout(timer);
//     }
//   }, [value, previousValue]);

    const formattedValue = type === 'currency' ? formatCurrency(value) : formatNumber(value);
  return (
    <span
    className={cn(
      'font-medium tabular-nums transition-all duration-200 rounded px-1',
      flashClass,
      className
    )}
  >
    {formattedValue}
  </span>
  )
});
