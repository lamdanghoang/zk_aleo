"use client";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import { useMemo } from "react";
import {
  PuzzleWalletAdapter,
  LeoWalletAdapter,
  FoxWalletAdapter,
  SoterWalletAdapter,
} from "aleo-adapters";
import { Toaster } from "@/components/ui/sonner";
import "./styles.css";

export default function Providers({ children }: { children: React.ReactNode }) {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: "Aleo app",
      }),
      new PuzzleWalletAdapter({
        programIdPermissions: {
          [WalletAdapterNetwork.TestnetBeta]: ["zksignaleov3.aleo"],
        },
        appName: "Aleo app",
        appDescription: "A privacy-focused DeFi app",
        appIconUrl: "",
      }),
      new FoxWalletAdapter({
        appName: "Aleo app",
      }),
      new SoterWalletAdapter({
        appName: "Aleo app",
      }),
    ],
    []
  );

  return (
    <WalletProvider
      wallets={wallets}
      decryptPermission={DecryptPermission.UponRequest}
      network={WalletAdapterNetwork.TestnetBeta}
      autoConnect
    >
      <WalletModalProvider>
        {children}
        <Toaster />
      </WalletModalProvider>
    </WalletProvider>
  );
}
