import React, { useRef } from "react";
import { Button, Typography, Box, IconButton, Modal } from "@mui/material";
import { IoMdClose } from "react-icons/io";

type FileUploadProps = {
  onChange: (files: File[]) => void;
  multiple?: boolean;
  helperText?: string;
};

const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  multiple = false,
  helperText,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [files, setFiles] = React.useState<File[]>([]);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles);

    // ✅ FILTER ONLY IMAGES
    const imageFiles = newFiles.filter((file) =>
      file.type.startsWith("image/"),
    );

    if (imageFiles.length !== newFiles.length) {
      setError("Yalnız şəkil faylları icazəlidir");
    } else {
      setError(null);
    }

    const updated = multiple ? [...files, ...imageFiles] : imageFiles;

    setFiles(updated);
    onChange(updated);

    // reset input so same file can be re-selected
    e.target.value = "";
  };

  const handleRemove = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onChange(updated);
  };

  const handlePreview = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleCloseModal = () => {
    setPreview(null);
  };

  return (
    <Box>
      <input
        type="file"
        hidden
        ref={inputRef}
        multiple={multiple}
        accept="image/*"
        onChange={handleChange}
      />

      <Button
        variant="contained"
        sx={{ backgroundColor: "#ff4646" }}
        onClick={handleClick}
      >
        Şəkil əlavə et
      </Button>

      {/* ❗ Error */}
      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}

      <Box sx={{ mt: 1 }}>
        {files.length > 0 ? (
          files.map((file, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 0.5,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => handlePreview(file)}
              >
                {file.name}
              </Typography>

              <IconButton size="small" onClick={() => handleRemove(idx)}>
                <IoMdClose />
              </IconButton>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="grey">
            Heç bir şəkil seçilməyib
          </Typography>
        )}
        {helperText && (
          <Typography
            style={{
              color: "#ff4646",
              marginLeft: 10,
              fontSize: 12,
              marginTop: 5,
            }}
          >
            {helperText}
          </Typography>
        )}
      </Box>
      <Modal open={!!preview} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            outline: "none",
            maxWidth: "90vw",
            maxHeight: "90vh",
          }}
        >
          {preview && (
            <img
              src={preview}
              alt="preview"
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                borderRadius: 8,
              }}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default FileUpload;
