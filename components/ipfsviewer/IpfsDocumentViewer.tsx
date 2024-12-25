import React, { useEffect, useState } from "react";
import { createHelia } from "helia";
import { strings } from "@helia/strings";
import { Card, CardContent } from "@/components/ui/card";
import { CID } from "multiformats/cid";

interface IpfsDocumentViewerProps {
  cid: string;
}

const IpfsDocumentViewer: React.FC<IpfsDocumentViewerProps> = ({ cid }) => {
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadIpfsContent = async () => {
      try {
        setLoading(true);
        // Create a Helia instance
        const helia = await createHelia();

        // Create a strings instance for reading text content
        const s = strings(helia);

        const parse_cid = CID.parse(cid);

        // Fetch the content using the CID
        const content = await s.get(parse_cid);
        setContent(content);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load IPFS content"
        );
        console.error("Error loading IPFS content:", err);
      } finally {
        setLoading(false);
      }
    };

    if (cid) {
      loadIpfsContent();
    }
  }, [cid]);

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="text-red-500">Error: {error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="whitespace-pre-wrap">{content}</div>
      </CardContent>
    </Card>
  );
};

export default IpfsDocumentViewer;
