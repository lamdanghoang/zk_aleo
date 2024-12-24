"use client";

import {
  AlertCircle,
  DollarSignIcon,
  FileUp,
  FingerprintIcon,
  SignatureIcon,
  Wallet,
  WalletCardsIcon,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import History from "@/components/dashboard/HistoryTable";
import UploadForm from "@/components/dashboard/UploadForm";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import IpfsDocumentViewer from "@/components/ipfsviewer/IpfsDocumentViewer";
import IpfsImageViewer from "@/components/ipfsviewer/IpfsImageViewer";

export default function Dashboard() {
  const { publicKey, connected } = useWallet();
  return (
    <div className="max-w-5xl mx-auto p-14 space-y-6">
      {/* Header Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <WalletCardsIcon width={28} height={28} />
            <h1 className="text-2xl">Your Wallet</h1>
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-8">
          <div className="flex items-center justify-around">
            <div className="flex items-center gap-4">
              <Wallet width={45} height={45} />
              <div>
                <h2 className="font-semibold">ADDRESS</h2>
                <p className="text-xl">{formatAddress(publicKey)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <DollarSignIcon width={45} height={45} />
              <div>
                <h2 className="font-semibold">ALEO</h2>
                <p className="text-xl">{connected ? "100" : "N/A"}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FingerprintIcon width={45} height={45} />
              <div>
                <h2 className="font-semibold">SIGN</h2>
                <p className="text-xl">{connected ? "0" : "N/A"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification */}
      <Alert
        variant="destructive"
        className="flex items-center justify-between bg-card"
      >
        <div className="flex gap-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You will need to opt into SIGN before you can start sending
            eContracts.
          </AlertDescription>
        </div>
        <Button variant="destructive" size="sm">
          OPT-IN
        </Button>
      </Alert>

      {/* Upload Contract */}
      <UploadForm />

      {/* Document Tabs and Table */}
      <History />
    </div>
  );
}

function formatAddress(address: string | null): string {
  if (!address) {
    return "N/A";
  }

  if (address.length <= 8) {
    return address;
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
