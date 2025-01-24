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
