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
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "10vh",
          left: "10vw",
          width: "80vw",
          height: "80vh",
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: 24,
          outline: "none",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          boxSizing: "border-box",
          p: 0,
        }}
      >
        {/* X sobresaliendo y con diseño agradable */}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: -28,
            right: 16,
            zIndex: 10,
            background: "white",
            border: "2px solid #eee",
            boxShadow: 2,
            width: 48,
            height: 48,
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
            p: 2,
            pt: 2,
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Modal>
  );
}