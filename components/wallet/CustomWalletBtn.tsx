"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { connect, disconnect, useAccount, useConnect } from "@puzzlehq/sdk";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, Copy, LogOut, PanelLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ConnectWalletButton() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isConnected } = useConnect();
  const { account } = useAccount();
  const [copySuccess, setCopySuccess] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (account?.address) {
      setAddress(account.address);
    }
  }, [account?.address]);

  const connectHandler = async () => {
    try {
      if (!isConnected) {
        setIsConnecting(true);
        await connect();
      }
      setIsConnecting(false);
    } catch (err) {
      console.error("Error checking connection:", err);
    }
  };

  const copyAddress = async () => {
    if (address) {
      try {
        await navigator.clipboard.writeText(address);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error("Failed to copy address:", err);
        setError("Failed to copy address to clipboard.");
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {!isConnected && (
        <Button onClick={connectHandler} disabled={isConnecting}>
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      )}
      {isConnected && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[150px] justify-between font-bold text-base"
            >
              {address?.slice(0, 6)}...{address?.slice(-4)}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[150px] p-0">
            <Button
              className="w-full justify-start rounded-none"
              variant="ghost"
              onClick={() => router.push("/dashboard")}
            >
              <PanelLeft className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              className="w-full justify-start rounded-none"
              variant="ghost"
              onClick={copyAddress}
            >
              <Copy className="mr-2 h-4 w-4" />
              {copySuccess ? "Copied!" : "Copy Address"}
            </Button>
            <Button
              className="w-full justify-start rounded-none"
              variant="ghost"
              onClick={() => {
                disconnect();
                setAddress(null);
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Disconnect
            </Button>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
