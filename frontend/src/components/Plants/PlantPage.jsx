import "./Plants.css";
import PlantCard from "./PlantCard";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";

import NewPlantForm from "./NewPlantForm";
import AddButton from "../common/AddButton";
import BasePage from "../common/BasePage";
import { fetchPlants, createPlant, deletePlant, updatePlant } from "./utils";
import { Typography } from "@mui/material";

const PlantPageV2 = () => {
  const [open, setOpen] = useState(false);
  const [plantList, setPlantList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [plant, setPlant] = useState({ name: "", watering_frequency: "OAW" });

  const getPlantList = () => {
    fetchPlants().then((response) => setPlantList(response.data));
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

    if (isEditing) {
      updatePlant(plantID, body).then(() => updatePage());
    } else {
      createPlant(body).then(() => updatePage());
    }
  };

  const handleDelete = (plant) => {
    deletePlant(plant.id).then(() => getPlantList());
  };

  const plants = plantList.map((plant) => (
    <PlantCard
      plant={plant}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  ));

  useEffect(() => {
    getPlantList();
  }, []);

  return (
    <BasePage>
      <div style={{ margin: "20px" }}>
        <Typography variant="h4">My Plants</Typography>
        <Autocomplete
          style={{ marginTop: "10px" }}
          fullWidth
          options={plantList.map((plant) => plant.name)}
          renderInput={(params) => (
            <TextField {...params} placeholder="Search for a plant..." />
          )}
        />
      </div>
      <div className="plant-list">
        {plants}
        <AddButton
          tooltipText="Add a plant"
          onClick={() => {
            setOpen(true);
            setIsEditing(false);
          }}
        />
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
    </BasePage>
  );
};
export default PlantPageV2;
