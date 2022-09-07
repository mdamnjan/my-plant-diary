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

const NewPlantForm = ({ open, onClose }) => {
  const defaultWatering = "Every week";
  const [name, setName] = useState("");
  const [wateringFreq, setWateringFreq] = useState(defaultWatering);
  const [imageURL, setImageURL] = useState("../../Calathea_orbifolia.jpg");

  const handleSubmit = (e) => {
    axios
      .post(
        "/plants/",
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
        <img id="pic" className="plant-profile-img" src={imageURL}></img>
        <input
        className="choose-image"
          type="file"
          onChange={(e) => {
            // TODO: this is probably not secure 
            setImageURL(window.URL.createObjectURL(e.target.files[0]));
          }}
        />
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
