"use client";

import { Button } from "@/components/ui/button";
import { Wallet, EclipseIcon as Ethereum, WalletIcon } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="max-w-5xl mx-auto mt-6 sticky top-0 z-50 w-full px-4 border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-3xl">
      <div className="flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <WalletIcon className="h-6 w-6" />
          <span className="font-semibold">ZkSign</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="px-3 py-2 flex items-center gap-2 border rounded-2xl">
            <Wallet className="h-4 w-4" />
            <span>0</span>
          </div>
          <div className="px-3 py-2 flex items-center gap-2 border rounded-3xl">
            <Ethereum className="h-4 w-4" />
            <span>Ethereum</span>
          </div>
          <Button
            variant="default"
            className="bg-black text-white hover:bg-black/90 rounded-3xl text-base"
          >
            Connect wallet
          </Button>
        </div>
      </div>
    </header>
  );
}
