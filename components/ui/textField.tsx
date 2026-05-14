import React from "react";
import { TextField as MUITextField, TextFieldProps } from "@mui/material";

export type TextFieldComponentProps = Omit<TextFieldProps, "onChange"> & {
  onChange?: (val: string) => void;
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
      color: "#807f7f",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: hasError ? "#ff4646" : "#807f7f",
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
      value={props.value || ""}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
};

export default TextField;
