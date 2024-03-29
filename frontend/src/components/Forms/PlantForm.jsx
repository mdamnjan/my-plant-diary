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

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import ImageUpload from "../common/ImageUpload";

const FreqChoices = {
  EOD: "Every Other Day",
  OAW: "Once a Week",
  ETW: "Every 2 Weeks",
  OAM: "Once a Month",
};

const PlantForm = ({ open, isEditing, onClose, plant, handleSubmit }) => {
  const defaultWatering = "OAW";
  const [name, setName] = useState("");
  const [wateringFreq, setWateringFreq] = useState(defaultWatering);
  const [img, setImg] = useState(null);

  const clearFields = () => {
    setName("");
    setWateringFreq(defaultWatering);
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
  }, [isEditing, plant]);

  return (
    <Dialog open={open} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          clearFields();
          handleSubmit(e, name, wateringFreq, plant.id, img);
        }}
        className="new-plant-form-container"
      >
        <ImageUpload img={img} setImg={setImg}/>
        <TextField
          onChange={(e) => setName(e.target.value)}
          className="plant-name-field"
          InputLabelProps={{ shrink: true }}
          label="Name"
          value={name}
        />
        {!isEditing && (
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
        )}
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
              <MenuItem value={freq}>{FreqChoices[freq]}</MenuItem>
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
export default PlantForm;
