import Dialog from "@mui/material/Dialog";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState, useEffect } from "react";

import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const FreqChoices = {
  EOD: "Every Other Day",
  OAW: "Once a Week",
  ETW: "Every 2 Weeks",
  OAM: "Once a Month",
};

const NewPlantForm = ({ open, isEditing, onClose, plant, handleSubmit }) => {
  const defaultWatering = "OAW";
  const [name, setName] = useState("");
  const [wateringFreq, setWateringFreq] = useState(defaultWatering);

  const clearFields = () => {
    setName("");
    setWateringFreq(FreqChoices[defaultWatering]);
  };
  const [lastWatered, setLastWatered] = useState(null);

  useEffect(() => {
    if (plant) {
      setName(plant.name);
      setWateringFreq(plant.watering_frequency);
    }
    if (!isEditing) {
      clearFields();
    }
  }, [isEditing]);

  return (
    <Dialog open={open} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          clearFields();
          handleSubmit(e, name, wateringFreq, plant.id);
        }}
        className="new-plant-form-container"
      >
        <img
          className="plant-profile-img"
          src="../../Calathea_orbifolia.jpg"
        ></img>
        <TextField
          onChange={(e) => setName(e.target.value)}
          className="plant-name-field"
          InputLabelProps={{ shrink: true }}
          label="Name"
          value={name}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="date-picker"
            label="Last Watered"
            value={lastWatered}
            onChange={(newValue) => {
              setLastWatered(newValue);
            }}
            renderInput={(params) => (
              <TextField InputLabelProps={{ shrink: true }} {...params} />
            )}
          />
        </LocalizationProvider>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="water-freq-field">Needs Water</InputLabel>
          <Select
            onChange={(e) => {
              setWateringFreq(e.target.value);
            }}
            defaultValue={defaultWatering}
            labelId="water-freq-field"
            className="watering-field"
            label="Needs Water"
            value={wateringFreq}
          >
            {["EOD", "OAW", "ETW", "OAM"].map((freq) => (
              <MenuItem value={FreqChoices[freq]}>{FreqChoices[freq]}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          className="confirm-add-button"
          variant="contained"
        >
          {isEditing ? "Update Plant" : "Add Plant"}
        </Button>{" "}
      </form>
    </Dialog>
  );
};
export default NewPlantForm;
