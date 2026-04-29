import React from "react";
import { Autocomplete, TextField, Chip, TextFieldProps } from "@mui/material";

export type SelectOption = {
  label: string;
  value: number | string;
};

export type MultiSelectFieldProps = Omit<TextFieldProps, "onChange"> & {
  options: SelectOption[];
  value?: (number | string)[];
  onChange(values: (number | string)[]): void;
  hasError?: boolean;
};

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  options,
  value = [],
  onChange,
  hasError,
  ...props
}) => {
  const selectedOptions = value
    ? options.filter((opt) => value.includes(opt.value))
    : [];

  return (
    <Autocomplete
      multiple
      options={options}
      value={selectedOptions}
      disableCloseOnSelect
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(opt, val) => opt.value === val.value}
      onChange={(_, newValues) => {
        onChange(newValues.map((v) => v.value));
      }}
      renderValue={(selected, getTagProps) =>
        selected.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            key={option.value}
            label={option.label}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          {...props}
          fullWidth
          error={hasError}
          sx={{
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
          }}
        />
      )}
    />
  );
};

export default MultiSelectField;
