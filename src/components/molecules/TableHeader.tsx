"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  Bookmark,
  BookmarkX,
  ChevronDown,
  EyeOff,
  Filter,
  List,
  Search,
  SlidersHorizontal,
  Wallet,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import list from "../../../public/list.svg";
import Image from "next/image";

type TabType = "top" | "trending" | "surge" | "dex-screener" | "pump-live";
export type TimeFilter = "1m" | "5m" | "30m" | "1h";

export const TableHeader = React.memo(function TableHeader() {
  const TABS: { id: TabType; label: string }[] = [
    { id: "top", label: "Top" },
    { id: "trending", label: "Trending" },
    { id: "surge", label: "Surge" },
    { id: "dex-screener", label: "DEX Screener" },
    { id: "pump-live", label: "Pump Live" },
  ];

  const TIME_FILTERS: TimeFilter[] = ["1m", "5m", "30m", "1h"];

  const [filterConfig, setFilterConfig] = useState({
    tab: "top",
    timeFilter: "1m",
    search: "",
  });

  const onTabChange = (id: string) => {
    setFilterConfig((prev) => ({
      ...prev,
      tab: id,
    }));
  };

  const onTimeFilterChange = (time: string) => {
    setFilterConfig((prev) => ({
      ...prev,
      timeFilter: time,
    }));
  };

  const onSearchChange = (val: string) => {
    setFilterConfig((prev) => ({
      ...prev,
      search: val,
    }));
  };
  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Tabs */}
        <div className="flex items-center gap-1">
          {TABS.map((tab) => (
            <div key={tab.id} className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "md:text-[20px] text-sm font-medium flex items-center gap-1",
                  filterConfig.tab === tab.id
                    ? "text-foreground"
                    : "text-muted-foreground",
                  tab.id === "pump-live" ? "hover:text-foreground" : ""
                )}
              >
                {tab.label}
              </Button>

              {tab.id === "pump-live" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="ml-1 p-1  rounded">
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-48 bg-muted border-border px-1 py-2 mt-4"
                  >
                    <DropdownMenuItem className="flex flex-col items-start gap-0.5 hover:bg-dropback">
                      <span className="text-sm font-medium">Live Tracker</span>
                      <span className="text-xs text-muted-foreground">
                        New Streams and Top Streams
                      </span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex flex-col items-start gap-0.5 hover:bg-dropback">
                      <span className="text-sm font-medium">
                        Top Stream Tokens
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Highest Market Cap Streams
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          ))}
        </div>

        {/* Time Filters & Actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-0.5">
            {TIME_FILTERS.map((time) => (
              <Button
                key={time}
                variant="ghost"
                size="sm"
                onClick={() => onTimeFilterChange(time)}
                className={cn(
                  "h-7 px-3 text-sm font-medium hover:bg-primary/30 hover:text-primary",
                  filterConfig.timeFilter === time && "text-primary"
                )}
              >
                {time}
              </Button>
            ))}
          </div>

          {/* filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="bg-muted rounded-4xl font-medium  text-foreground"
              >
                <SlidersHorizontal className="h-3 w-3 ml-1" />
                Filter <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-background border-border"
            >
              <DropdownMenuItem>Market Cap &gt; $10K</DropdownMenuItem>
              <DropdownMenuItem>Liquidity &gt; $5K</DropdownMenuItem>
              <DropdownMenuItem>Verified Only</DropdownMenuItem>
              <DropdownMenuItem>Hide Rugged</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-muted rounded-4xl"
          >
            <BookmarkX className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-muted rounded-4xl"
          >
            <EyeOff className="h-4 w-4" />
          </Button>

          <div className="flex items-center border border-border gap-2 ml-2 rounded-[20px] h-9 px-4  ">
            <Wallet className="h-3 w-3" />

            <span className="text-foreground">0</span>

            <Image src={list} alt="list" />
            <span className="text-foreground">1</span>

            <ChevronDown className="h-3 w-3 ml-2" />
          </div>

          <div className="flex items-center border border-border gap-2 ml-2 rounded-[20px] h-9 px-4  ">
            <div className="flex gap-8 border-r  border-border">
              <p className="text-muted-foreground text-sm">Quick Buy 0.0</p>

              <Image src={list} alt="list" className="mr-2" />
            </div>
            <div className="ml-1 gap-1">P1 P2 P3</div>
          </div>
        </div>
      </div>
      {/* Search */}
    </div>
  );
});
