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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function History() {
  return (
    <Card>
      <CardContent className="p-0">
        <Tabs defaultValue="minted" className="w-full">
          <TabsList className="w-full justify-start rounded-none h-auto flex-wrap">
            <TabsTrigger
              value="minted"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:pb-2.5 data-[state=active]:shadow:none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-6 py-3"
            >
              MINTED eCONTRACTS
            </TabsTrigger>
            <TabsTrigger
              value="received"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:pb-2.5 data-[state=active]:shadow:none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-6 py-3"
            >
              RECEIVED eCONTRACTS
            </TabsTrigger>
            <TabsTrigger
              value="sent"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:pb-2.5 data-[state=active]:shadow:none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-6 py-3"
            >
              SENT eCONTRACTS
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:pb-2.5 data-[state=active]:shadow:none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-6 py-3"
            >
              COMPLETED eCONTRACTS
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
  );
}

function TableComponent() {
  return (
    <div className="px-5">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-bold text-lg">NFD ID</TableHead>
            <TableHead className="font-bold text-lg">eContract Name</TableHead>
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
