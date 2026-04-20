import React from "react";
import { TextField as MUITextField, TextFieldProps } from "@mui/material";

export type TextFieldComponentProps = TextFieldProps & {
  onChange(val: string): void;
  hasError?: boolean;
};

const TextField: React.FC<TextFieldComponentProps> = ({
  hasError,
  onChange,
  ...props
}) => {
  const sx = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#fff",
      "& fieldset": {
        borderRadius: "10px",
        borderColor: hasError ? "#ff4646" : "lightgray",
      },
      "&:hover fieldset": {
        borderColor: hasError ? "#ff4646" : "lightgray",
      },
      "&.Mui-focused fieldset": {
        borderColor: hasError ? "#ff4646" : "lightgray",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#000000",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: hasError ? "#ff4646" : "#E84B2F",
    },
    "& .MuiFormHelperText-root": {
      color: "#ff4646",
    },
  };

  return (
    <MUITextField
      {...props}
      sx={sx}
      fullWidth
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextField;
