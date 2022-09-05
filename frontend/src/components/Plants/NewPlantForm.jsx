import Dialog from "@mui/material/Dialog";
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
const NewPlantForm = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <div className="new-plant-form-container">
        <TextField className="plant-name-field" InputLabelProps={{shrink: true}} label="Name" />
        <FormControl sx={{ width: "100%" }}>
        <InputLabel id="water-frequency-field">Needs Water</InputLabel>
        <Select defaultValue={"Every week"} labelId="water-frequency-field" className="watering-field" label="Needs Water" >
          <MenuItem value={"Every week"}>Every week</MenuItem>
          <MenuItem value={"Every 2 weeks"}>Every 2 weeks</MenuItem>
          <MenuItem value={"Once a month"}>Once a month</MenuItem>
        </Select>
        </FormControl>
        <Button className="confirm-add-button" variant="contained">Add Plant</Button>{" "}
      </div>
    </Dialog>
  );
};
export default NewPlantForm;
