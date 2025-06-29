import { IconButton, ButtonGroup, Tooltip } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
interface SortButtonsProps {
  onSortAsc: () => void;
  onSortDesc: () => void;
}

export default function SortButtons({ onSortAsc, onSortDesc }: SortButtonsProps) {
  return (
    <ButtonGroup size="small" variant="outlined" sx={{ py: 0, px: 0 }}>
      <Tooltip title="Sort ascending">
        <IconButton onClick={onSortAsc}>
          <ExpandMoreIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Sort descending">
        <IconButton onClick={onSortDesc}>
          <ExpandLessIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </ButtonGroup>
  );
}