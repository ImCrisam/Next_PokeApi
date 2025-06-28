import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export default function ModalComponent({ open, onClose, children }: ModalProps) {
  return (
    <Modal open={open} onClose={onClose} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box
        sx={{
          position: "absolute",
          bgcolor: "transparent",
          borderRadius: 4,
          boxShadow: 8,
          outline: "none",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          boxSizing: "border-box",
          p: 0,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: -16,
            right: -16,
            zIndex: 100,
            background: "white",
            border: "2px solid #eee",
            boxShadow: 2,
            width: 32,
            height: 32,
            "&:hover": {
              background: "#f5f5f5",
            },
          }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            maxWidth: "88vw",
            maxHeight: "88vh",
            display: "flex",
            bgcolor: "transparent",
          }}
        >
          {children}
        </Box>
      </Box>
    </Modal>
  );
}