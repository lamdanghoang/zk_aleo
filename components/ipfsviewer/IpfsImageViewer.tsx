import React, { useEffect, useState } from "react";
import { createHelia } from "helia";
import { unixfs } from "@helia/unixfs";
import { Card, CardContent } from "@/components/ui/card";
import { CID } from "multiformats/cid";

interface IpfsImageViewerProps {
  cid: string;
  onClose: () => void;
}

const IpfsImageViewer: React.FC<IpfsImageViewerProps> = ({ cid }) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadIpfsImage = async () => {
      try {
        setLoading(true);
        // Create a Helia instance
        const helia = await createHelia();

        // Create a unixfs instance
        const fs = unixfs(helia);

        const parse_cid = CID.parse(cid);

        // Fetch the image bytes
        const chunks = [];
        for await (const chunk of fs.cat(parse_cid)) {
          chunks.push(chunk);
        }

        // Calculate the sum of chunks
        const totalLength = chunks.reduce(
          (acc, chunk) => acc + chunk.length,
          0
        );

        // Create a Uint8Array
        const imageData = new Uint8Array(totalLength);
        let offset = 0;

        // Copy each chunk in its position
        for (const chunk of chunks) {
          imageData.set(chunk, offset);
          offset += chunk.length;
        }

        // Convert to blob and create URL
        const blob = new Blob([imageData], { type: "image/jpeg" }); // Adjust type if needed
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load IPFS image"
        );
        console.error("Error loading IPFS image:", err);
      } finally {
        setLoading(false);
      }
    };

    if (cid) {
      loadIpfsImage();
    }

    // Cleanup function to revoke object URL
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
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
        {imageUrl && (
          <div className="relative w-full aspect-video">
            <img
              src={imageUrl}
              alt="IPFS content"
              className="object-contain w-full h-full"
              onError={() => setError("Failed to load image")}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IpfsImageViewer;
