import React from "react";
import {
  TextField as MUITextField,
  MenuItem,
  TextFieldProps,
} from "@mui/material";

export type SelectOption = {
  label: string;
  value: string | number;
};

export type SelectFieldProps = Omit<TextFieldProps, "onChange" | "select"> & {
  options: SelectOption[];
  onChange(val: string): void;
  hasError?: boolean;
};

const SelectField: React.FC<SelectFieldProps> = ({
  hasError,
  options = [],
  ...props
}) => {
  return (
    <MUITextField
      select
      fullWidth
      sx={{
        marginBottom: 2,
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
      }}
      {...props}
      onChange={(e) => props.onChange(e.target.value as string)}
      value={props.value ?? ""}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </MUITextField>
  );
};

export default SelectField;
