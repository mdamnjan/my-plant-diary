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

  const plants = plantList.map((plant) => (
    <>
      <PlantCard plant={plant} />
      <Divider />
    </>
  ));

  useEffect(() => {
    axios
      .get("/plants", { auth: { username: "admin", password: "admin" } })
      .then((response) => setPlantList(response.data));
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
          }}
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
        </Tooltip>
      </div>
      <NewPlantForm onClose={() => setOpen(false)} open={open} />
    </div>
  );
};
export default PlantPage;
