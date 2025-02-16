"use client";
/* eslint-disable */

import React, { useState, ChangeEvent, FormEvent } from "react";
import { FileUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Upload } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Transaction } from "@demox-labs/aleo-wallet-adapter-base";
import { WalletAdapterNetwork } from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";

interface FileData {
  file: File;
  base64: string;
}

interface FormData {
  publicKey: string;
  viewKey: string;
  files: FileData[];
  base64s: string[];
}

export default function ContractUploadForm() {
  const [formData, setFormData] = useState<FormData>({
    publicKey: "",
    viewKey: "",
    files: [],
    base64s: [],
  });
  const [isError, setIsError] = useState<boolean | undefined>(undefined);
  const { publicKey, connected, requestTransaction } = useWallet();
  const [transitionIds, setTransitionIds] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const uploadData = async (formData: FormData) => {
    try {
      const response = await fetch("https://zksign-dev.vercel.app/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          files: formData.base64s,
          viewkey: formData.viewKey,
        }),
      });
      if (!response.ok) {
        setIsError(true);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Upload successful:", data);
      setIsError(false);
      return data;
    } catch (error) {
      console.error("Error when uploading:", error);
      throw error;
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newFiles: FileData[] = [];

    const fileToBase64Promises = files.map((file) => {
      return new Promise<{ file: File; base64: string }>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          // Get the base64 string by removing the data URL prefix
          const base64 = reader.result?.toString().split(",")[1] || "";
          resolve({ file, base64 });
        };

        reader.onerror = (error) => {
          console.error(`Error reading file ${file.name}:`, error);
          reject(error);
        };

        reader.readAsDataURL(file);
      });
    });

    for (const file of files) {
      try {
        const results = await Promise.all(fileToBase64Promises);
        for (const result of results) {
          newFiles.push(result);
        }

        setFormData((prev) => ({
          ...prev,
          files: [...prev.files, ...newFiles],
          base64s: [...prev.base64s, ...newFiles.map((f) => f.base64)],
        }));
      } catch (err) {
        console.error("Error processing file: ", err);
      }
    }
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const generateRandomNumber = (seed: string) => {
    const hash = Array.from(seed).reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );
    return Math.floor(Math.random() * hash);
  };

  const submitTransaction = async (address: string, randomNumbers: any) => {
    if (!publicKey || !requestTransaction) {
      console.log("Undefine key aleo");
      return;
    }

    let view_id = generateRandomNumber(address);

    const fee = 350_000;
    let inputs = [
      address,
      "2411u128",
      `{ part0: ${randomNumbers[0]}u128, part1: ${randomNumbers[1]}u128, part2: ${randomNumbers[2]}u128, part3: ${randomNumbers[3]}u128 }`,
      `${view_id}field`,
    ];
    const aleoTransaction = Transaction.createTransaction(
      publicKey,
      WalletAdapterNetwork.TestnetBeta,
      "zksignaleov3.aleo",
      "create_document",
      inputs,
      fee,
      false
    );
    const txid = await requestTransaction(aleoTransaction);
    if (txid) {
      console.log(txid);
      setTransitionIds((prev) => [...prev, txid]);
    }
  };

  const generateRandomNumbers = (base64: string): number[] => {
    const hash = Array.from(base64).reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );
    return Array.from({ length: 4 }, () => Math.floor(Math.random() * hash));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.viewKey || formData.files.length === 0) return;

    setUploading(true);
    try {
      for (const file of formData.files) {
        const randomNumbers = generateRandomNumbers(file.base64);
        await submitTransaction(formData.publicKey, randomNumbers);
      }

      const response = await uploadData(formData);
      console.log(response);

      setFormData({
        publicKey: "",
        viewKey: "",
        files: [],
        base64s: [],
      });
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="space-y-4 px-16 py-8 rounded-lg border bg-card">
        <div className="flex gap-1 items-center justify-center">
          <FileUp />
          <h1 className="text-2xl">Submit Your eContract</h1>
        </div>
        <Card className="w-full max-w-md bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              Upload Contract
            </CardTitle>
            <CardDescription className="pt-4">
              Please provide the necessary information to upload your contract.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="publicKey" className="text-base">
                  Sender Public Key <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="publicKey"
                  name="publicKey"
                  placeholder="Add public key"
                  value={formData.publicKey}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="viewKey" className="text-base">
                  Receiver Public Key <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="viewKey"
                  name="viewKey"
                  placeholder="Add view key"
                  value={formData.viewKey}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contractFile" className="text-base">
                  Upload Contract File <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="contractFile"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        Click to <span className="font-semibold">upload</span>{" "}
                        or <span className="font-semibold">drag</span> and{" "}
                        <span className="font-semibold">drop</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, DOCX, PNG, SVG,... <br />
                        (MAX. 10MB)
                      </p>
                    </div>
                    <Input
                      id="contractFile"
                      name="contractFile"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.png,.svg,.jpeg,.gif"
                      multiple
                      required
                    />
                  </label>
                </div>
                {formData.files.length > 0 && (
                  <div className="space-y-2">
                    {formData.files.map((fileData, index) => (
                      <Alert
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <AlertTitle>{fileData.file.name}</AlertTitle>
                          <AlertDescription>
                            {(fileData.file.size / 1024 / 1024).toFixed(2)} MB
                          </AlertDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </Alert>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full button"
                disabled={uploading || formData.files.length === 0}
              >
                {uploading ? "Uploading..." : "Submit"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        {isError === false && transitionIds.length > 0 && (
          <Alert className="flex justify-between items-center bg-green-600">
            <div className="space-y-2 text-gray-100">
              <AlertTitle className="font-semibold">
                Your submission is successful !
              </AlertTitle>
              <AlertDescription>
                Transition IDs:{" "}
                <ol>
                  {transitionIds.map((transitionId) => (
                    <li key={transitionId}>{transitionId}</li>
                  ))}
                </ol>
              </AlertDescription>
            </div>
            <button
              onClick={() => setIsError(undefined)}
              className="p-2 w-10 bg-gray-100 rounded-full"
            >
              ✕
            </button>
          </Alert>
        )}
        {isError === true && (
          <Alert className="flex justify-between items-center">
            <AlertTitle>An error occurred ! Try again later !</AlertTitle>
            <button
              onClick={() => setIsError(undefined)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              ✕
            </button>
          </Alert>
        )}
      </div>
    </div>
  );
}
