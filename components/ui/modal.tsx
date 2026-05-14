import {
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import SubmitButton from "./submitButton";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  buttons: ButtonProps[];
}

const AppModal = ({
  open,
  onClose,
  description,
  title,
  buttons,
}: ModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          padding: "20px",
        },
        "& .MuiDialogActions-root": {
          padding: "20px",
        },
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      role="alertdialog"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {buttons.map((button, index) => (
          <SubmitButton key={index} {...button} />
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default AppModal;
