"use client";

import { useState } from "react";
import { toast } from "sonner";
import FileUpload from "./components/fileUpload";
import { Trash2 } from "lucide-react";

function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="mt-10 px-2">
      <FileUpload files={files} setFiles={setFiles} />
      <div>
        {files.length > 0 && (
          <div className="mt-3  flex gap-2">
            <div className="p-2 bg-[#1F2121] rounded-md w-11/12">
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-2">
                  <p className="text-xs font-medium" title={files[0].name}>
                    {files[0].name}
                  </p>
                  <p className="text-xs">{formatFileSize(files[0].size)}</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFiles([]);
                    toast.info("File removed");
                  }}
                  className="text-xs cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                console.log("Uploading file:", files[0]);
              }}
              className="text-xs rounded-md font-medium cursor-pointer text-[#191a1a] w-1/12 bg-[#EDEDED] hover:bg-[#edededcb]"
            >
              Upload
            </button>
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
}

export default UploadPage;
