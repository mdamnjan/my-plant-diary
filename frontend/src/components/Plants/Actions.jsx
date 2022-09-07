import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

const Actions = ({ subject, handleEdit, handleDelete }) => {
  return (
    <div className="actions">
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          handleEdit(subject);
        }}
        className="action-button"
        color="primary"
      >
        <EditIcon />
      </IconButton>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(subject);
        }}
        className="action-button"
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default Actions;
