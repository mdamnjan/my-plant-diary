import { Fab, Tooltip, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const StyledFab = styled(Fab) (() => ({
  position: "sticky !important",
  bottom: "100px",
  left: "50%",
  overflowY: "auto",
  transform: "translateX(-50%)",
}));

const AddButton = ({ tooltipText, onClick }) => {
  return (
    <Tooltip placement="top" title={tooltipText}>
      <StyledFab onClick={onClick} color="primary" aria-label="add">
        <AddIcon />
      </StyledFab>
    </Tooltip>
  );
};
export default AddButton;
