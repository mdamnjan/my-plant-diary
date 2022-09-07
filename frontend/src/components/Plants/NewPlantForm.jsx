import Dialog from "@mui/material/Dialog";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

const FreqChoices = {
  EOD: "Every Other Day",
  OAW: "Once a Week",
  ETW: "Every 2 Weeks",
  OAM: "Once a Month",
};

const NewPlantForm = ({ open, onClose, plant }) => {
  const defaultWatering = "Every week";
  const [name, setName] = useState(plant.name);
  const [wateringFreq, setWateringFreq] = useState(plant.watering_frequency);
  const [imageURL, setImageURL] = useState("../../Calathea_orbifolia.jpg");

  // if (plant) {
  //   setName(plant.name)
  //   setWateringFreq(plant.watering_frequency)
  // }

  const handleSubmit = (e) => {
    let url = plant? `/plants/${plant.id}/`: '/plants/'
    axios
      .post(
        url,
        { name: name, watering_frequency: wateringFreq },
        {
          auth: { username: "admin", password: "admin" },
        }
      )
      .then((response) => console.log(response));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="new-plant-form-container"
      >
        <img className="plant-profile-img" src="../../Calathea_orbifolia.jpg"></img>
        <TextField
          onChange={(e) => setName(e.target.value)}
          className="plant-name-field"
          InputLabelProps={{ shrink: true }}
          label="Name"
        />
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="water-freq-field">Needs Water</InputLabel>
          <Select
            onChange={(e) => setWateringFreq(e.target.value)}
            defaultValue={defaultWatering}
            labelId="water-freq-field"
            className="watering-field"
            label="Needs Water"
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
          Add Plant
        </Button>{" "}
      </form>
    </Dialog>
  );
};
export default NewPlantForm;
