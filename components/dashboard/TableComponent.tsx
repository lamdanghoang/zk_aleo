"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import IpfsImageViewer from "@/components/ipfsviewer/IpfsImageViewer";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { Transaction } from "@demox-labs/aleo-wallet-adapter-base";
import { WalletAdapterNetwork } from "@demox-labs/aleo-wallet-adapter-base";

interface TableProps {
  data?: {
    nfdId: string;
    eContractName: string;
    creationDate: string;
  }[];
}

export default function TableComponent({ data = [] }: TableProps) {
  const [selectedRow, setSelectedRow] = useState<(typeof data)[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { connected, publicKey, requestTransaction } = useWallet();

  const submitTransaction = async (address: string | null) => {
    if (!publicKey || !requestTransaction) {
      console.log("Undefine key aleo");
      return;
    }

    const fee = 350_000;
    const inputs = [address, "2411u128"];
    const aleoTransaction = Transaction.createTransaction(
      publicKey,
      WalletAdapterNetwork.TestnetBeta,
      "zksignaleov1.aleo",
      "create_document",
      inputs,
      fee,
      false
    );
    const txid = await requestTransaction(aleoTransaction);
    if (txid) {
      console.log(txid);
    }
  };

  return (
    <div className="px-5">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-bold text-lg">NFD ID</TableHead>
            <TableHead className="font-bold text-lg">eContract Name</TableHead>
            <TableHead className="font-bold text-lg">Creation Date</TableHead>
            <TableHead className="font-bold text-lg"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {connected &&
            data.length > 0 &&
            data.map((row, index) => (
              <TableRow
                key={index}
                className="cursor-pointer hover:bg-gray-100"
              >
                <TableCell
                  onClick={() => {
                    setSelectedRow(row);
                    setIsModalOpen(true);
                  }}
                >
                  {row.nfdId}
                </TableCell>
                <TableCell
                  onClick={() => {
                    setSelectedRow(row);
                    setIsModalOpen(true);
                  }}
                >
                  {row.eContractName}
                </TableCell>
                <TableCell
                  onClick={() => {
                    setSelectedRow(row);
                    setIsModalOpen(true);
                  }}
                >
                  {row.creationDate}
                </TableCell>
                <TableCell>
                  <Button onClick={() => submitTransaction(publicKey)}>
                    Sign
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          {!connected && (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center font-semibold text-lg"
              >
                No Data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {isModalOpen && selectedRow && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-4 rounded-lg max-w-3xl w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 p-2 hover:bg-gray-100 rounded-full"
            >
              ✕
            </button>
            <IpfsImageViewer
              cid={selectedRow.nfdId}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}

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
