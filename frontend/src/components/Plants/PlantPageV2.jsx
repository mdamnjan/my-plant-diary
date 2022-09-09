import "./Plants.css";
import PlantCardV2 from "./PlantCardV2";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";

import NewPlantForm from "./NewPlantForm";
import AddButton from "./AddButton";
import SideBar from "./SideBar";
import Filters from "./Filters"

import { fetchPlants, createPlant, deletePlant, updatePlant } from "./utils";

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
    <PlantCardV2
      plant={plant}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  ));

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
        <Filters/>
        {/* <Autocomplete
          fullWidth
          //   className="search-field"
          options={plantList.map((plant) => plant.name)}
          renderInput={(params) => <TextField {...params} label="Plant" />}
        /> */}
        <div className="plant-list-v2">
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
      </div>
    </div>
  );
};
export default PlantPageV2;
