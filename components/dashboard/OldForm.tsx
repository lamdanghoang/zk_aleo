import { FileUp, SignatureIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Forms() {
  return (
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
                If this message still persists after you have done so, check out
                the FAQ.
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
                If this message still persists after you have done so, check out
                the FAQ.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
