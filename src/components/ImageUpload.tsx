"use client";
import { UploadButton } from "@/lib/uploadthing";
import React from "react";

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
                {/* <Button onClick={() => onChange("")} className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm">
                    <XIcon className="h-4 w-4 text-white" />
                </Button> */}
            </div>
        )
    }

    return (
        <div className="w-25 flex items-center">
            <UploadButton
                endpoint={endpoint}
                appearance={{
                    button: {
                        color: "var(--background)",
                        background: "var(--foreground)",
                        padding: "0 8px"
                    },
                }}
                onClientUploadComplete={(res) => {
                    // Penanganan setelah unggahan selesai
                    console.log("Files: ", res);
                    if (res && res[0]?.ufsUrl) {
                        onChange(res[0].ufsUrl);
                    }
                }}
                onUploadError={(error: Error) => {
                    // Penanganan jika terjadi kesalahan saat unggah
                    alert(`ERROR! ${error.message}`);
                }}
            />

        </div>
    );
}
