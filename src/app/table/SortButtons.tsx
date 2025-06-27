import { IconButton, ButtonGroup, Tooltip } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface SortButtonsProps {
  onSortAsc: () => void;
  onSortDesc: () => void;
}

export default function SortButtons({ onSortAsc, onSortDesc }: SortButtonsProps) {
  return (
    <ButtonGroup size="small" variant="outlined">
      <Tooltip title="Sort ascending">
        <IconButton onClick={onSortAsc}>
          <ArrowUpwardIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Sort descending">
        <IconButton onClick={onSortDesc}>
          <ArrowDownwardIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </ButtonGroup>
  );
}