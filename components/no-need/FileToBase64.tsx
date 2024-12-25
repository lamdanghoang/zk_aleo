"use client";
import React, { ChangeEvent, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FileToBase64Props {
  onBase64Generated?: (base64: string) => void;
  acceptedFileTypes?: string;
}

const FileToBase64: React.FC<FileToBase64Props> = ({
  onBase64Generated,
  acceptedFileTypes = "*",
}) => {
  const [base64Result, setBase64Result] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64 = result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError("");

    if (!file) {
      setError("No file selected");
      return;
    }

    try {
      const base64 = await convertToBase64(file);
      setBase64Result(base64);
      setFileName(file.name);
      onBase64Generated?.(base64);
    } catch (err) {
      setError("Failed to convert file to base64");
      console.error("Error converting file:", err);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>File to Base64 Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid w-full items-center gap-4">
            <input
              type="file"
              onChange={handleFileChange}
              accept={acceptedFileTypes}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          {base64Result && (
            <div className="space-y-2">
              <p className="text-sm font-medium">File: {fileName}</p>
              <div className="relative">
                <textarea
                  readOnly
                  value={base64Result}
                  className="w-full h-32 p-2 text-sm font-mono bg-gray-50 rounded-md"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(base64Result);
                  }}
                  className="absolute top-2 right-2 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileToBase64;
