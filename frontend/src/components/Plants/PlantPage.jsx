import "./Plants.css";
import PlantCard from "./PlantCard";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Divider } from "@mui/material";
import { useState } from "react";
import NewPlantForm from "./NewPlantForm"

import AddIcon from "./AddButton";

const plantList = [
  { id: 1, name: "Calathea Orbifolia" },
  { id: 2, name: "String of Hearts" },
  { id: 3, name: "Peperomia Obtusifolia" },
  { id: 3, name: "Peperomia Obtusifolia" },
  { id: 3, name: "Peperomia Obtusifolia" },
  { id: 3, name: "Peperomia Obtusifolia" },
  { id: 3, name: "Peperomia Obtusifolia" },
  { id: 3, name: "Peperomia Obtusifolia" },
];

const PlantPage = () => {
  const plants = plantList.map((plant) => (
    <>
      <PlantCard plant={plant} />
      <Divider />
    </>
  ));

  const [open, setOpen] = useState(false);

  return (
    <div className="plant-page-container">
      <h1>My Plants</h1>
      <Autocomplete
        className="search-field"
        options={plantList.map((plant) => plant.name)}
        renderInput={(params) => <TextField {...params} label="Plant" />}
      />
      <div className="plant-list">{plants}</div>
      <AddIcon
        onClick={() => {
          console.log("This is working")
          setOpen(true);
        }}
      />
      <NewPlantForm onClose={() => setOpen(false)} open={open} />
    </div>
  );
};
export default PlantPage;
