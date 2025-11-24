export type FileUploadeProps = {
  files: File[];
  setFiles: (files: File[]) => void;
};

export type UploadedFile = {
  id: string;
  file_name: string;
};
