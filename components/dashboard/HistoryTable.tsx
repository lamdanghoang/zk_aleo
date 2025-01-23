"use client";
/* eslint-disable */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableComponent from "@/components/dashboard/TableComponent";
import { useEffect, useState } from "react";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";

interface DataType {
  id: string;
  viewkey: string;
  cid: string;
  signed_status: number;
}

export default function History() {
  const { connected, publicKey, requestTransaction } = useWallet();
  const [tableData, setTableData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        if (!publicKey) return;
        const response = await fetch(
          `https://zksign-dev.vercel.app/documents?viewkey=${publicKey}`
        );

        const result = await response.json();
        setTableData(result.documents);
      } catch (error) {
        console.log("Fail to fetch table data");
      }
    };

    fetchTableData();
  }, [publicKey]);

  return (
    <Card>
      <CardContent className="p-0">
        <TableComponent data={tableData} />
      </CardContent>
    </Card>
  );
}

const minted_list = [
  {
    nfdId: "QmTvpxkqWhoP5Nuqpw9GCwZa2q1Tt2qrw7ikc1toopJ3q2",
    eContractName: "My Leofi",
    creationDate: "24/12/2024",
  },
  {
    nfdId: "QmcxerZCr21F1zN97NifdYfJjpNay8vpf17wkt9E2a3Ngo",
    eContractName: "My Bear",
    creationDate: "23/12/2024",
  },
  {
    nfdId: "QmNWTAK5M3GRx8R94NXsJA1n15GzkcrbmUA3t3gJyotNAw",
    eContractName: "My Big Bear",
    creationDate: "22/12/2024",
  },
  {
    nfdId: "QmPfxSoDiwQX3Kb6UyEahKdP3UnyqHB6bcgrDJrY61v67X",
    eContractName: "My Ox",
    creationDate: "21/12/2024",
  },
  {
    nfdId: "QmZ7C2jnE5T2WBRejhPExgitfwbQFpyVLo2zcXfamVpnbF",
    eContractName: "My Cow",
    creationDate: "20/12/2024",
  },
];

const pending_list = [
  {
    nfdId: "QmcxerZCr21F1zN97NifdYfJjpNay8vpf17wkt9E2a3Ngo",
    eContractName: "My Bear",
    creationDate: "23/12/2024",
  },
  {
    nfdId: "QmNWTAK5M3GRx8R94NXsJA1n15GzkcrbmUA3t3gJyotNAw",
    eContractName: "My Big Bear",
    creationDate: "22/12/2024",
  },
];

const complete_list = [
  {
    nfdId: "QmTvpxkqWhoP5Nuqpw9GCwZa2q1Tt2qrw7ikc1toopJ3q2",
    eContractName: "My Leofi",
    creationDate: "24/12/2024",
  },
];
