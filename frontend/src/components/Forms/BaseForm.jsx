import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";

const BaseForm = ({
  open,
  onClose,
  handleSubmit,
  title,
  buttonText,
  children,
}) => {
  return (
    <Dialog color="primary" open={open} onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: "20px",
          padding: "20px",
          minWidth: "280px",
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        {children}
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            {buttonText}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default BaseForm;
