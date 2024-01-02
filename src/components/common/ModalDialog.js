import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ModalDialog({
  open,
  title,
  content,
  onClose,
  onConfirm,
  onCancel,
  icon,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-icon" sx={{ textAlign: "center" }}>
          {icon}
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onCancel}>
          No
        </Button>
        <Button color="secondary" onClick={onConfirm} autoFocus>
          Sí
        </Button>
      </DialogActions>
    </Dialog>
  );
}
