import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';

const AddButton= ({onClick}) => {
  return (
    <IconButton className="plus-button" onClick={onClick}>
      <AddCircleIcon className="plus-icon" />
    </IconButton>
  );
};
export default AddButton