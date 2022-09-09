import { useLocation, useNavigate } from "react-router-dom";
import PlantCard from "./PlantCard";
import HistoryWidget from "./HistoryWidget";
import PlantCardV2 from "./PlantCardV2";
import { handleDeletePlant } from "./utils";


const PlantDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const plant = location.state;
  const handleDelete = (plant) => {
    handleDeletePlant(plant.id).then(() => navigate("/"));
  };

  return (
    <div className="plant-detail-container">
      <PlantCardV2 plant={plant} handleDelete={handleDelete} />
      <HistoryWidget />
    </div>
  );
};
export default PlantDetailPage;
