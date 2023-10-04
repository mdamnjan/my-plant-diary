import "./Plants.css";
import PlantCard from "./PlantCard";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";

import NewPlantForm from "./NewPlantForm";
import AddButton from "../common/AddButton";
import SideBar from "../common/SideBar";
import { fetchPlants, createPlant, deletePlant, updatePlant, refreshToken } from "./utils";

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

  const refresh = async () => {
    await refreshToken().then((res)=>console.log("here", res))
  }

  useEffect(() => {
    getPlantList();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <SideBar
        navigation
        onClick={() => {
          console.log("Clicked");
          setOpen(true);
          setIsEditing(false);
        }}
      />
      <div className="plant-page-container">
        <Autocomplete
          fullWidth
          options={plantList.map((plant) => plant.name)}
          renderInput={(params) => <TextField {...params} label="Plant" />}
        />
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
        <button onClick={refresh}>Refresh token</button>
      </div>
    </div>
  );
};
export default PlantPageV2;
