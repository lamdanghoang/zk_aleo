"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface IpfsImageViewerProps {
  cid: string;
  onClose?: () => void;
}

const ImageViewer: React.FC<IpfsImageViewerProps> = ({ cid }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const proxyUrl = `https://scared-blue-planarian.myfilebase.com/ipfs/${cid}`;

    fetch(proxyUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        setImageUrl(URL.createObjectURL(blob));
      })
      .catch((err) => {
        console.error("Error fetching IPFS image:", err);
        setError("Failed to load image");
      });

    // Cleanup function to revoke object URL
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [cid, imageUrl]);

  if (error) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6 text-red-500">{error}</CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="relative w-full aspect-video">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="IPFS content"
              className="object-contain w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              Loading...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageViewer;
