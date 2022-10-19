import { useLocation, useNavigate } from "react-router-dom";
import HistoryWidget from "./HistoryWidget";
import PlantCardV2 from "./PlantCard";
import { createWateringEntry, deletePlant, fetchPlants, fetchWateringEntries } from "./utils";
import AddButton from "../common/AddButton";
import { Typography } from "@mui/material";
import { useState } from "react";
import WateringEntryForm from "./WateringEntryForm";
import { useEffect } from "react";

const PlantDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const plant = location.state;
  const handleDelete = (plant) => {
    deletePlant(plant.id).then(() => navigate("/"));
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="plant-detail-container">
      <img src="../../Calathea_orbifolia.jpg"></img>
      <Typography variant="h5">{plant.name}</Typography>
      <Typography variant="body1">Last Watered: {plant.last_watered}</Typography>
      <Typography variant="body1">Next Watering: {plant.next_watering}</Typography>
      <Typography variant="body1">Watering Frequency: {plant.watering_frequency}</Typography>
      <div></div>
      <WateringEntryForm
        open={open}
        onClose={() => setOpen(false)}
        plant={plant}
        handleSubmit={(body) => createWateringEntry(body)}
      />
      <AddButton
        tooltipText="Log a watering entry"
        onClick={() => setOpen(true)}
      />
    </div>
  );
};
export default PlantDetailPage;
