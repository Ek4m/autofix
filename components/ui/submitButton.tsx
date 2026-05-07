import { Button, ButtonProps } from "@mui/material";
import React, { FC } from "react";

const SubmitButton: FC<ButtonProps> = (props) => {
  return (
    <Button
      className="w-full py-3"
      {...props}
      sx={{
        p: 1.7,
        borderRadius: 2,
        fontWeight: "700",
        color: props.variant === "contained" ? "white" : "#E84B2F",
        backgroundColor: props.variant === "contained" ? "#E84B2F" : "white",
        borderColor: props.variant === "outlined" ? "#E84B2F" : "white",
      }}
    >
      {props.title}
    </Button>
  );
};

export default SubmitButton;
