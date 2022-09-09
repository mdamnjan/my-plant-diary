import { useLocation, useNavigate } from "react-router-dom";
import PlantCard from "./PlantCard";
import HistoryWidget from "./HistoryWidget";
import PlantCardV2 from "./PlantCardV2";
import { deletePlant } from "./utils";


const PlantDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const plant = location.state;
  const handleDelete = (plant) => {
    deletePlant(plant.id).then(() => navigate("/"));
  };

  return (
    <div className="plant-detail-container">
      <PlantCardV2 plant={plant} handleDelete={handleDelete} />
      <HistoryWidget />
    </div>
  );
};
export default PlantDetailPage;
