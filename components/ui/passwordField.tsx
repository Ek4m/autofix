"use client";

import React, { useState } from "react";
import TextField, { TextFieldComponentProps } from "./textField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordField: React.FC<TextFieldComponentProps> = (props) => {
  const [show, setShow] = useState(false);

  return (
    <TextField
      {...props}
      type={show ? "text" : "password"}
      onChange={props.onChange}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShow((prev) => !prev)} edge="end">
                {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default PasswordField;
