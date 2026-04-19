import React from "react";
import { TextField as MUITextField, TextFieldProps } from "@mui/material";

export type TextFieldComponentProps = TextFieldProps & {
  onChange(val: string): void;
  hasError?: boolean;
};

const TextField: React.FC<TextFieldComponentProps> = (props) => {
  return (
    <MUITextField
      sx={{
        marginBottom: 2,
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderRadius: "10px",
            borderColor: props.hasError ? "#ff4646" : "lightgray", // default border
          },

          "&:hover fieldset": {
            borderColor: props.hasError ? "#ff4646" : "lightgray", // default border
          },

          "&.Mui-focused fieldset": {
            borderColor: props.hasError ? "#ff4646" : "lightgray", // default border
          },
        },

        "& .MuiInputLabel-root": {
          color: "#000000", // default label color
        },

        "& .MuiInputLabel-root.Mui-focused": {
          color: props.hasError ? "#ff4646" : "#E84B2F", // default border
        },
        "& .MuiFormHelperText-root": {
          color: "#ff4646",
        },
      }}
      fullWidth
      {...props}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
};

export default TextField;
