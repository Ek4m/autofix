import React, { ReactNode } from "react";
import { toast } from "sonner";

interface FilePickerProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  children: ReactNode;
}

const FilePicker = ({
  onFileSelect,
  accept = "image/*",
  children,
}: FilePickerProps) => {
  const imageRef = React.useRef<HTMLInputElement>(null);

  const onPickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const file = Array.from(selectedFiles)[0];

    if (file && !file.type.startsWith("image/")) {
      toast.error(`Yalnız ${accept} faylları icazəlidir`);
    } else {
      onFileSelect(file);
    }
  };
  return (
    <>
      <div onClick={() => imageRef.current?.click()}>{children}</div>
      <input
        type="file"
        style={{ display: "none" }}
        ref={imageRef}
        onChange={onPickImage}
      />
    </>
  );
};

export default FilePicker;
