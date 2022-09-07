import "./Plants.css";
import PlantCard from "./PlantCard";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Divider, Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import axios from "axios";

import NewPlantForm from "./NewPlantForm";

const PlantPage = () => {
  const [open, setOpen] = useState(false);
  const [plantList, setPlantList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [plant, setPlant] = useState({ name: "", watering_frequency: "OAW" });

  const getPlantList = () => {
    axios
      .get("/plants", { auth: { username: "admin", password: "admin" } })
      .then((response) => setPlantList(response.data));
  };

  const handleEdit = (plant) => {
    setIsEditing(true);
    setOpen(true);
    setPlant(plant);
  };

  const handleSubmit = (e, name, wateringFreq, plantID) => {
    let url = isEditing ? `/plants/${plantID}/` : "/plants/";

    if (isEditing) {
      axios
        .put(
          url,
          { name: name, watering_frequency: wateringFreq },
          {
            auth: { username: "admin", password: "admin" },
          }
        )
        .then((response) => console.log(response));
    } else {
      axios
        .post(
          url,
          { name: name, watering_frequency: wateringFreq },
          {
            auth: { username: "admin", password: "admin" },
          }
        )
        .then((response) => console.log(response));
    }

    setOpen(false);
    getPlantList();
  };

  const handleDelete = (plant) => {
    console.log("Did this work");
    axios
      .delete(`/plants/${plant.id}/`, {
        auth: { username: "admin", password: "admin" },
      })
      .then(() => getPlantList());
  };

  const plants = plantList.map((plant) => (
    <>
      <PlantCard
        plant={plant}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <Divider />
    </>
  ));

  useEffect(() => {
    getPlantList();
  }, []);

  return (
    <div className="plant-page-container">
      <h1>My Plants</h1>
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
  );
};
export default PlantPage;
