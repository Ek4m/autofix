import { Box, Typography } from "@mui/material";
import React from "react";
import PhoneInputLib from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

type PhoneInputProps = {
  value?: string;
  onChange(val: string): void;
  hasError?: boolean;
  label?: string;
  helperText?: string;
};

const PhoneField: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  hasError,
  helperText,
  label,
}) => {
  return (
    <Box>
      {label && (
        <label
          style={{
            display: "block",
            marginBottom: 0,
            color: hasError ? "#ff4646" : "#807f7f",
            fontSize: 14,
          }}
        >
          {label}
        </label>
      )}

      <PhoneInputLib
        country={"az"} // default Azerbaijan
        value={value}
        onChange={(phone) => onChange(phone)}
        inputStyle={{
          width: "100%",
          height: "56px",
          borderRadius: "10px",
          borderColor: hasError ? "#ff4646" : "lightgray",
        }}
        buttonStyle={{
          borderRadius: "10px 0 0 10px",
          borderColor: hasError ? "#ff4646" : "lightgray",
        }}
        containerStyle={{
          width: "100%",
        }}
      />

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
  );
};

export default PhoneField;
