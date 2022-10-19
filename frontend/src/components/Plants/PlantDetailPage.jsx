import { useLocation, useNavigate } from "react-router-dom";
import HistoryWidget from "./HistoryWidget";
import PlantCardV2 from "./PlantCard";
import { createWateringEntry, deletePlant, fetchPlants, fetchWateringEntries } from "./utils";
import AddButton from "./AddButton";
import { useState } from "react";
import WateringEntryForm from "./WateringEntryForm";

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
      <PlantCardV2 plant={plant} handleDelete={handleDelete} />
      <HistoryWidget />
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
