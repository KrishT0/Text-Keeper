export type FileUploadeProps = {
  setFiles: (files: File[]) => void;
};

export type UploadedFile = {
  id: string;
  file_name: string;
};
