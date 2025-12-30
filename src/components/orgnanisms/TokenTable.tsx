"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import type { TokenData, SortConfig, SortField} from "@/types/token";
import { generateMockTokens } from "@/data/mockTokens";
import { TokenInfoCell } from "../molecules/TokenInfoCell";
import { Chart } from "@/components/atoms/Chart";
import { PriceCell } from "../molecules/PriceCell";
import { PercentChange } from "../molecules/PercentChange";
import { TxnsInfo } from "../molecules/TxnsInfo";
import { TokenHoldersInfo } from "../molecules/TokenHoldersInfo";
import { HoldersStats } from "../molecules/HoldersStats";
import { BuyButton } from "../molecules/BuyButton";

// const SortIcon = React.memo(function SortIcon({
//   field,
//   sortConfig,
// }: {
//   field: SortField;
//   sortConfig: SortConfig;
// }) {
//   if (sortConfig.field !== field)
//     return <ArrowUpDown className="h-3 w-3 ml-1 opacity-50" />;
//   return sortConfig.direction === "asc" ? (
//     <ArrowUp className="h-3 w-3 ml-1" />
//   ) : (
//     <ArrowDown className="h-3 w-3 ml-1" />
//   );
// });

export const TokenTable = React.memo(function TokenTable(
  
) {

  const [data,setData]=useState<TokenData[]>([{
    token: {
      id: "",
      symbol: "",
      name: "",
      image: "",
      age:"",
      ageMs:1,
      verified:true,
      chain:"SOL",
      contractAddress: "",
    },
    metrics: {
      marketCap:1,
      marketCapChange:1,
      liquidity: 1,
      volume: 1,
      txns: 1,
      buys: 1,
      sells:1,
    },
    holders: {
      top10Percent: 1,
      devPercent: 1,
      sniperPercent: 1,
      insiderPercent: 1,
      holders: 1,
      lp:1,
    },
    status: {
      bundled: true,
      paid: true,
      migrated: true,
      rugged: true,
    },
    chart:[
      {
        timestamp: 1,
        price: 1
      }
    ],
    views:1,
  }])

  useEffect(()=>{
    const data=generateMockTokens()
    setData(data)
  },[])


  console.log(data)
  // const [sortConfig,setSortConfig]=useState({
  //   field:"age",
  //   direction:"asc"
  // })

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-card hover:bg-card border-border">
            <TableHead className="w-70 text-muted-foreground font-medium">
              Pair Info
            </TableHead>
            <TableHead className="w-30" />
            <TableHead
              className="cursor-pointer hover:text-foreground"
              // onClick={handleSort("marketCap")}
            >
              <span className="flex items-center">
                Market Cap{" "}
                {/* <SortIcon field="marketCap" 
                // sortConfig={sortConfig}
                 /> */}
              </span>
            </TableHead>
            <TableHead
              className="cursor-pointer hover:text-foreground"
              // onClick={handleSort("liquidity")}
            >
              <span className="flex items-center">
                Liquidity 
                {/* <SortIcon field="liquidity" sortConfig={sortConfig} /> */}
              </span>
            </TableHead>
            <TableHead
              className="cursor-pointer hover:text-foreground"
              // onClick={handleSort("volume")}
            >
              <span className="flex items-center">
                Volume 
                {/* <SortIcon field="volume" sortConfig={sortConfig} /> */}
              </span>
            </TableHead>
            <TableHead
              className="cursor-pointer hover:text-foreground"
              // onClick={handleSort("txns")}
            >
              <span className="flex items-center">
                TXNS 
                {/* <SortIcon field="txns" sortConfig={sortConfig} /> */}
              </span>
            </TableHead>
            <TableHead>Token Info</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => {
            // const update = priceUpdates.get(item.token.id);
            return (
              <TableRow
                key={item.token.id}
                className="row-hover border-border animate-fade-in"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <TableCell>
                  <TokenInfoCell token={item.token} views={item.views} />
                </TableCell>
                <TableCell>
                  <Chart data={item.chart} width={80} height={32} />
                </TableCell>
                <TableCell>
                  <div
                    // className={cn(
                    //   update?.direction === "up"
                    //     ? "price-flash-up"
                    //     : update?.direction === "down"
                    //     ? "price-flash-down"
                    //     : "",
                    //   "rounded px-1"
                    // )}
                  >
                    <PriceCell value={item.metrics.marketCap} />
                    <PercentChange
                      value={item.metrics.marketCapChange}
                      size="sm"
                      className="block"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <PriceCell value={item.metrics.liquidity} />
                </TableCell>
                <TableCell>
                  <PriceCell value={item.metrics.volume} />
                </TableCell>
                <TableCell>
                  <TxnsInfo
                    total={item.metrics.txns}
                    buys={item.metrics.buys}
                    sells={item.metrics.sells}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <TokenHoldersInfo holders={item.holders} />
                    <HoldersStats
                      holders={item.holders.holders}
                      lp={item.holders.lp}
                    />
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <BuyButton token={item.token} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
});
