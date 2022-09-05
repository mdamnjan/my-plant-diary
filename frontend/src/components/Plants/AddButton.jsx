import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';

const AddButton= ({onClick}) => {
  return (
    <IconButton onClick={onClick}>
      <AddCircleOutlineIcon className="plus-icon icon2" />
      <AddCircleIcon className="plus-icon" />
    </IconButton>
  );
};
export default AddButton