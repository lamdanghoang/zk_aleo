"use client";
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

interface FormData {
  publicKey: string;
  viewKey: string;
  file: File | null;
}

export default function ContractUploadForm() {
  const [formData, setFormData] = useState<FormData>({
    publicKey: "",
    viewKey: "",
    file: null,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted", formData);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="space-y-4">
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
                  Public Key
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
                  View Key
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
                  Upload Contract File
                </Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="contractFile"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, DOCX (MAX. 10MB)
                      </p>
                    </div>
                    <Input
                      id="contractFile"
                      name="contractFile"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
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
      </div>
    </div>
  );
}
