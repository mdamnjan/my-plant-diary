import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import "./Plants.css"

const AddButton = ({ tooltipText, onClick }) => {
  return (
    <Tooltip placement="top" title={tooltipText}>
      <Fab
        className="plus-button-v2"
        onClick={onClick}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};
export default AddButton;
