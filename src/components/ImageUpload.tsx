"use client";
import { UploadButton } from "@/lib/uploadthing";
import React from "react";
import { Button } from "./ui/button";
import { Upload, XIcon } from "lucide-react";

interface ImageUploadProps {
    onChange: (url: string) => void;
    value: string;
    endpoint: "postImage"
}

export default function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {

    if (value) {
        return (
            <div>
                <img src={value} alt="Upload" className="rounded-md w-20 object-cover" />
                <Button onClick={() => onChange("")} className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm">
                    <XIcon className="h-4 w-4 text-white" />
                </Button>
            </div>
        )
    }

    return (
        <div className="w-25 flex items-center">
            <Button variant={"outline"} className="text-foreground flex text-center items-center">
                <Upload /> Upload Image
                <UploadButton
                endpoint={endpoint}
                onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    // Update the image here
                    if (res && res[0]?.ufsUrl) {
                        onChange(res[0].ufsUrl)
                    }
                }}
                onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                }}
            />
            </Button>
        </div>
    );
}
