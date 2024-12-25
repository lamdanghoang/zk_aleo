/* eslint-disable */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableComponent from "@/components/dashboard/TableComponent";

export default function History() {
  return (
    <Card>
      <CardContent className="p-0">
        <Tabs defaultValue="minted" className="w-full">
          <TabsList className="w-full justify-start rounded-none h-auto flex-wrap gap-1 p-1 sm:p-0">
            <TabsTrigger
              value="minted"
              className="flex-1 min-w-[140px] text-xs sm:text-sm data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:pb-2.5 data-[state=active]:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-2 sm:px-6 py-2 sm:py-3"
            >
              MINTED eCONTRACTS
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="flex-1 min-w-[140px] text-xs sm:text-sm data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:pb-2.5 data-[state=active]:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-2 sm:px-6 py-2 sm:py-3"
            >
              PENDING eCONTRACTS
            </TabsTrigger>
            {/* <TabsTrigger
              value="sent"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:pb-2.5 data-[state=active]:shadow:none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-6 py-3"
            >
              SENT eCONTRACTS
            </TabsTrigger> */}
            <TabsTrigger
              value="completed"
              className="flex-1 min-w-[140px] text-xs sm:text-sm data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:pb-2.5 data-[state=active]:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-2 sm:px-6 py-2 sm:py-3"
            >
              COMPLETED eCONTRACTS
            </TabsTrigger>
          </TabsList>
          <TabsContent value="minted" className="m-0">
            <TableComponent data={minted_list} />
          </TabsContent>
          <TabsContent value="pending" className="m-0">
            <TableComponent data={pending_list} />
          </TabsContent>
          {/* <TabsContent value="sent" className="m-0">
            <TableComponent />
          </TabsContent> */}
          <TabsContent value="completed" className="m-0">
            <TableComponent data={complete_list} />
          </TabsContent>
        </Tabs>
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
