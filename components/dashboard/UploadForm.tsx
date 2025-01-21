"use client";
/* eslint-disable */

import React, { useState, ChangeEvent, FormEvent } from "react";
import { FileUp } from "lucide-react";
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

interface FormData {
  publicKey: string;
  viewKey: string;
  file: File | null;
  base64: string;
}

export default function ContractUploadForm() {
  const [formData, setFormData] = useState<FormData>({
    publicKey: "",
    viewKey: "",
    file: null,
    base64: "",
  });
  const [base64Result, setBase64Result] = useState<string>("");
  const [isError, setIsError] = useState<boolean | undefined>(undefined);
  const { publicKey, connected, requestTransaction } = useWallet();
  const [transitionId, setTransitionId] = useState<string | undefined>(
    undefined
  );

  const uploadData = async (formData: FormData) => {
    try {
      const response = await fetch("https://zksign-dev.vercel.app/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          file: formData.base64,
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
    const file = e.target.files?.[0] || null;
    if (!file) {
      return;
    }

    try {
      const base64 = await convertToBase64(file);
      setBase64Result(base64);
      setFormData((prev) => ({ ...prev, file, base64: base64 }));
    } catch (err) {
      console.error("Error converting file:", err);
    }
  };

  const submitTransaction = async (address: string) => {
    if (!publicKey || !requestTransaction) {
      console.log("Undefine key aleo");
      return;
    }

    const fee = 350_000;
    let inputs = [address, "2411u128"];
    const aleoTransaction = Transaction.createTransaction(
      publicKey,
      WalletAdapterNetwork.TestnetBeta,
      "zksignaleov1.aleo",
      "create_document",
      inputs,
      fee,
      false
    );
    const txid = await requestTransaction(aleoTransaction);
    if (txid) {
      console.log(txid);
      setTransitionId(txid);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted", formData);
    if (!formData.viewKey || !formData.base64) {
      console.log("Cannot submit");
      return;
    }

    submitTransaction(formData.publicKey);
    uploadData(formData);

    // Reset form after submission
    setFormData({
      publicKey: "",
      viewKey: "",
      file: null,
      base64: "",
    });
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
                  Public Key <span className="text-red-500">*</span>
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
                  View Key <span className="text-red-500">*</span>
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
                      required
                    />
                  </label>
                </div>
                {formData.file && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>File selected</AlertTitle>
                    <AlertDescription>
                      {formData.file.name} (
                      {(formData.file.size / 1024 / 1024).toFixed(2)} MB)
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full button">
                Submit
              </Button>
            </CardFooter>
          </form>
        </Card>
        {isError === false && transitionId && (
          <Alert className="flex justify-between items-center bg-green-600">
            <div className="space-y-2 text-gray-100">
              <AlertTitle className="font-semibold">
                Your submission is successful !
              </AlertTitle>
              <AlertDescription>Transition ID: {transitionId}</AlertDescription>
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
