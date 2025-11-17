"use client";

import { FileUp } from "lucide-react";
import { useCallback } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { toast } from "sonner";
import type { FileUploadeProps } from "../types";

function FileUpload({ files, setFiles }: FileUploadeProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 1) {
        toast.warning("Only 1 file can be uploaded at once.");
        return;
      }

      setFiles(acceptedFiles);

      if (acceptedFiles.length === 1) {
        toast.success(`File "${acceptedFiles[0].name}" ready to upload`);
      }
    },
    [setFiles]
  );

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    const error = fileRejections[0].errors[0];
    console.log(fileRejections);
    let message = "File upload failed";

    if (error.code === "file-too-large") {
      message = "File is too large. Maximum size is 5MB.";
    } else if (error.code === "too-many-files") {
      message = "Only 1 file can be uploaded at a time.";
    } else {
      message = `Upload failed: ${error.message}`;
    }

    toast.warning(message);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    // Accept all file types by not specifying accept property
    // Or use accept: { '*/*': [] } to be explicit
    multiple: false, // Force single file
    maxFiles: 1, // Enforce maximum 1 file
    maxSize: 5 * 1024 * 1024, // 5MB limit
  });

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center rounded-lg border border-dashed p-6 cursor-pointer transition-colors ${
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-muted-foreground/50"
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <FileUp className="h-8 w-8 text-muted-foreground" />
        <div className="space-y-1">
          <p className="text-sm font-medium">
            {isDragActive ? "Drop file here" : "Drag & drop file here"}
          </p>
          <p className="text-xs text-muted-foreground">
            or click to browse files
          </p>
          <p className="text-xs text-[#949592]">
            All file types accepted • Max 5MB • 1 file only
          </p>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
