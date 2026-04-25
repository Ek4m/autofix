import React from "react";
import {
  Switch,
  SwitchProps,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface SwitchFieldProps extends SwitchProps {
  label?: string;
  helperText?: string;
  hasError: boolean;
}

const StyledSwitch = styled(Switch)(() => ({
  width: 50,
  height: 30,
  padding: 0,

  "& .MuiSwitch-switchBase": {
    padding: 2,
    transitionDuration: "300ms",

    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: "#fff",

      "& + .MuiSwitch-track": {
        backgroundColor: "#E84B2F",
        opacity: 1,
      },
    },
  },

  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 26,
    height: 26,
  },

  "& .MuiSwitch-track": {
    borderRadius: 30,
    backgroundColor: "#e5e5ea",
    opacity: 1,
  },
}));

const SwitchField: React.FC<SwitchFieldProps> = ({
  label,
  helperText,
  hasError,
  ...props
}) => {
  return (
    <div>
      {label ? (
        <FormControlLabel control={<StyledSwitch {...props} />} label={label} />
      ) : (
        <StyledSwitch {...props} />
      )}

      {hasError && (
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
    </div>
  );
};

export default SwitchField;
