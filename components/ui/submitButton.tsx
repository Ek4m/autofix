import { Button, ButtonProps } from "@mui/material";
import React, { FC } from "react";

const SubmitButton: FC<ButtonProps> = (props) => {
  return (
    <Button
      className="!btn-primary w-full py-3"
      {...props}
      sx={{ color: "white", p: 2, borderRadius: 2, fontWeight: "500" }}
    >
      {props.title}
    </Button>
  );
};

export default SubmitButton;
