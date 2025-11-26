"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import FileUpload from "./components/fileUpload";
import type { UploadedFile } from "./types";
import { Download, Trash2 } from "lucide-react";
import { deleteFile, downloadFile, getUserFiles, uploadFile } from "./actions";

function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[] | []>([]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  useEffect(() => {
    const fetchUploadedFiles = async () => {
      try {
        const response = await getUserFiles();
        const data: UploadedFile[] = (response.data as UploadedFile[]) || [];
        setUploadedFiles(data);
      } catch (error) {
        console.error("Error fetching uploaded files:", error);
      }
    };

    fetchUploadedFiles();
  }, [files]);

  const uploadFileToServer = async () => {
    if (files.length === 0) {
      toast.error("No file selected for upload");
      return;
    }
    await uploadFile(files[0]);
    toast.success("File uploaded successfully");
    setFiles([]);
  };

  const downloadUploadedFile = async (fileName: string) => {
    try {
      const data = await downloadFile(fileName);
      if (data instanceof Blob) {
        const url = window.URL.createObjectURL(data);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const deleteUploadedFile = async (fileName: string) => {
    try {
      await deleteFile(fileName);
      toast.success("File deleted successfully");
      setUploadedFiles((prevFiles) =>
        prevFiles.filter((file) => file.file_name !== fileName)
      );
    } catch (error) {}
  };

  const trimFileName = (fileName: string, maxLength: number = 30) => {
    if (fileName.length <= maxLength) return fileName;
    const trimmedName = fileName.slice(0, maxLength) + "...";
    return trimmedName;
  };

  return (
    <div className="mt-10 px-2">
      <FileUpload setFiles={setFiles} />
      <div>
        {files.length > 0 && (
          <div className="mt-3 flex flex-col sm:flex-row gap-2">
            <div className="p-2 bg-[#1F2121] rounded-md w-full sm:w-5/6 md:w-11/12">
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-2">
                  <p
                    className="text-xs font-medium text-ellipsis"
                    title={files[0].name}
                  >
                    {trimFileName(files[0].name)}
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
              onClick={uploadFileToServer}
              className="text-xs rounded-md p-1 font-medium cursor-pointer text-[#191a1a] w-full sm:w-1/6 md:w-1/12 bg-[#EDEDED] hover:bg-[#edededcb]"
            >
              Upload
            </button>
          </div>
        )}
      </div>
      <div>
        <h2 className="font-medium text-center mt-5">Files</h2>
        {uploadedFiles.length !== 0 ? (
          uploadedFiles.map((file) => (
            <div key={file.id} className="mt-3 p-2 bg-[#1F2121] rounded-md">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium" title={file.file_name}>
                  {trimFileName(file.file_name)}
                </p>
                <div className="flex gap-4">
                  <Download
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => downloadUploadedFile(file.file_name)}
                  />
                  <Trash2
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => deleteUploadedFile(file.file_name)}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-2 font-medium text-sm">
            No files uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default UploadPage;
