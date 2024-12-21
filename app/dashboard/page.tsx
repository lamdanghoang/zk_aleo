"use client";

import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  DollarSignIcon,
  FileText,
  FileUp,
  Fingerprint,
  FingerprintIcon,
  SignatureIcon,
  Wallet,
  WalletCardsIcon,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Dashboard() {
  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      {/* Header Stats */}
      <div className="flex items-center justify-center gap-2">
        <WalletCardsIcon width={28} height={28} />
        <h1 className="text-2xl">Your Wallet</h1>
      </div>
      <Card>
        <CardContent className="py-8">
          <div className="flex items-center justify-around">
            <div className="flex items-center gap-4">
              <Wallet width={45} height={45} />
              <div>
                <h2 className="font-semibold">ADDRESS</h2>
                <p className="text-xl">H3LZ ... WLRI</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <DollarSignIcon width={45} height={45} />
              <div>
                <h2 className="font-semibold">ALEO</h2>
                <p className="text-xl">100</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FingerprintIcon width={45} height={45} />
              <div>
                <h2 className="font-semibold">SIGN</h2>
                <p className="text-xl">0</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification */}
      <Alert
        variant="destructive"
        className="flex items-center justify-between"
      >
        <div className="flex gap-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You will need to opt into SIGN before you can start sending
            documents.
          </AlertDescription>
        </div>
        <Button variant="destructive" size="sm">
          OPT-IN
        </Button>
      </Alert>

      {/* Upload Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex gap-1 items-center justify-center">
            <FileUp />
            <h1 className="text-2xl">Mint Non-Fungible Document</h1>
          </div>
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                Upload Document
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">
                  Any document format is allowed
                </p>
              </div>
              <div className="bg-white/50 rounded-md px-4 py-2 text-center">
                Cost of Minting: 47 SIGN
              </div>
              <div className="bg-white border-2 border-dashed border-muted rounded-lg p-8 text-center space-y-4">
                <p className="text-lg">
                  Ensure that you have completed the necessary steps.
                </p>
                <p className="text-muted-foreground">
                  If this message still persists after you have done so, check
                  out the FAQ.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex gap-1 items-center justify-center">
            <SignatureIcon />
            <h1 className="text-2xl">Sign & Mint Non-Fungible Document</h1>
          </div>
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                Upload Document
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">Only PDFs are allowed</p>
              </div>
              <div className="bg-white/50 rounded-md px-4 py-2 text-center">
                Cost of Minting: 47 SIGN
              </div>
              <div className="bg-white border-2 border-dashed border-muted rounded-lg p-8 text-center space-y-4">
                <p className="text-lg">
                  Ensure that you have completed the necessary steps.
                </p>
                <p className="text-muted-foreground">
                  If this message still persists after you have done so, check
                  out the FAQ.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Document Tabs and Table */}
      <Card>
        <CardContent className="p-0">
          <Tabs defaultValue="minted" className="w-full">
            <TabsList className="w-full justify-start rounded-none h-auto flex-wrap">
              <TabsTrigger
                value="minted"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:pb-2.5 data-[state=active]:shadow:none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-6 py-3"
              >
                MINTED DOCUMENTS
              </TabsTrigger>
              <TabsTrigger
                value="received"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:pb-2.5 data-[state=active]:shadow:none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-6 py-3"
              >
                RECEIVED DOCUMENTS
              </TabsTrigger>
              <TabsTrigger
                value="sent"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:pb-2.5 data-[state=active]:shadow:none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-6 py-3"
              >
                SENT DOCUMENTS
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:pb-2.5 data-[state=active]:shadow:none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-6 py-3"
              >
                COMPLETED DOCUMENTS
              </TabsTrigger>
            </TabsList>
            <TabsContent value="minted" className="m-0">
              <TableComponent />
            </TabsContent>
            <TabsContent value="received" className="m-0">
              <TableComponent />
            </TabsContent>
            <TabsContent value="sent" className="m-0">
              <TableComponent />
            </TabsContent>
            <TabsContent value="completed" className="m-0">
              <TableComponent />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function TableComponent() {
  return (
    <div className="px-5">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-bold text-lg">NFD ID</TableHead>
            <TableHead className="font-bold text-lg">Document Name</TableHead>
            <TableHead className="font-bold text-lg">Creation Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{/* Empty state shown by default */}</TableBody>
      </Table>
      <div className="flex items-center justify-center gap-4 p-4 border-t">
        <Button variant="ghost" size="icon" disabled>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span>1</span>
        <Button variant="ghost" size="icon" disabled>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
