"use client";
import React, { useMemo } from "react";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import "./styles.css";
import { Toaster } from "@/components/ui/sonner";

interface Props {
  children: React.ReactNode;
}

export const Wallet: React.FC<Props> = ({ children }) => {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: "zkSign App",
      }),
    ],
    []
  );

  return (
    <WalletProvider
      wallets={wallets}
      decryptPermission={DecryptPermission.UponRequest}
      network={WalletAdapterNetwork.TestnetBeta}
      autoConnect={false}
    >
      <WalletModalProvider>
        {/* <PuzzleWalletProvider
          dAppName="zkSign"
          dAppDescription="A zkSign app for Aleo"
          dAppUrl="None"
          dAppIconURL="None"
        > */}
        {children}
        {/* </PuzzleWalletProvider> */}
      </WalletModalProvider>
      <Toaster />
    </WalletProvider>
  );
};
