import { useLocation, useNavigate } from "react-router-dom";
import PlantCard from "./PlantCard";
import HistoryWidget from "./HistoryWidget";
import PlantCardV2 from "./PlantCardV2";
import axios from "axios";
import { useEffect, useState } from "react";

let tempAuth = { auth: { username: "admin", password: "admin" } };

const PlantDetailPage = () => {
  const [wateringEntries, setWateringEntries] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const plant = location.state;
  const handleDelete = (plant) => {
    axios.delete(`/plants/${plant.id}/`, tempAuth).then(() => navigate("/"));
  };

  useEffect(() => {
    axios
      .get("/watering", tempAuth)
      .then((response) =>
        setWateringEntries(
          response.data.filter((entry) => entry.id == plant.id)
        )
      );
  }, []);

  return (
    <div className="plant-detail-container">
      <PlantCardV2 plant={plant} handleDelete={handleDelete} />
      {wateringEntries.map((entry) => entry.watered_on)}
      <HistoryWidget entries={wateringEntries}/>
    </div>
  );
};
export default PlantDetailPage;
