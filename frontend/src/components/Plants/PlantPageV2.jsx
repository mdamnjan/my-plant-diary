import "./Plants.css";
import PlantCard from "./PlantCard";
import PlantCardV2 from "./PlantCardV2";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Divider, Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import axios from "axios";

import NewPlantForm from "./NewPlantForm";
import HistoryWidget from "./HistoryWidget";

// temporary basic auth for admin
let tempAuth = { auth: { username: "admin", password: "admin" } };

const PlantPageV2 = () => {
  const [open, setOpen] = useState(false);
  const [plantList, setPlantList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [plant, setPlant] = useState({ name: "", watering_frequency: "OAW" });
  const [wateringEntries, setWateringEntries] = useState([]);

  const getPlantList = () => {
    axios
      .get("/plants", tempAuth)
      .then((response) => setPlantList(response.data));
  };

  const handleEdit = (plant) => {
    setIsEditing(true);
    setOpen(true);
    setPlant(plant);
  };

  const handleSubmit = (e, name, wateringFreq, plantID) => {
    const updatePage = () => {
      setOpen(false);
      getPlantList();
      setIsEditing(false);
    };

    const body = { name: name, watering_frequency: wateringFreq };
    const auth = tempAuth;

    if (isEditing) {
      axios.put(`/plants/${plantID}/`, body, auth).then(() => updatePage());
    } else {
      axios.post("/plants/", body, auth).then(() => updatePage());
    }
  };

  const handleDelete = (plant) => {
    axios.delete(`/plants/${plant.id}/`, tempAuth).then(() => getPlantList());
  };

  const plants = plantList.map((plant) => (
    <PlantCardV2
      plant={plant}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  ));

  useEffect(() => {
    axios
      .get("/watering", tempAuth)
      .then((response) => setWateringEntries(response.data));
    getPlantList();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <HistoryWidget entries={wateringEntries} />
      <div className="plant-page-container">
        <Autocomplete
          className="search-field"
          options={plantList.map((plant) => plant.name)}
          renderInput={(params) => <TextField {...params} label="Plant" />}
        />
        <div className="plant-list">
          {plants}
          <Tooltip placement="top" title="Add a plant">
            <Fab
              className="plus-button"
              onClick={() => {
                setOpen(true);
                setIsEditing(false);
              }}
              color="primary"
              aria-label="add"
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </div>
        <NewPlantForm
          handleSubmit={handleSubmit}
          isEditing={isEditing}
          plant={plant}
          onClose={() => {
            setOpen(false);
          }}
          open={open}
        />
      </div>
    </div>
  );
};
export default PlantPageV2;
