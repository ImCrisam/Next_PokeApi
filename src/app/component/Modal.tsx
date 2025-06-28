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
    <Modal open={open} onClose={onClose} className="center-flex">
      <Box
        sx={{
          position: "absolute",
          maxWidth: "80vw",
          height: "80vh",
          bgcolor: "transparent",
          borderRadius: 4,
          boxShadow: 8,
          outline: "none",
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