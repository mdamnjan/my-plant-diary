import { useLocation, useNavigate } from "react-router-dom";
import PlantCard from "./PlantCard";
import axios from "axios";


let tempAuth = { auth: { username: "admin", password: "admin" } };

const PlantDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const plant = location.state;
  const handleDelete = (plant) => {
    axios.delete(`/plants/${plant.id}/`, tempAuth).then(()=>navigate("/"));
  };

  return (
    <div className="plant-detail-container">
        <PlantCard plant={plant} handleDelete={handleDelete}/>

      {/* <h1>{plant.name}</h1>
      <img
        className="plant-profile-img"
        src="../../Calathea_orbifolia.jpg"
      ></img>
      <h3>Watering Frequency</h3>
      <p>{plant.watering_frequency}</p> */}
    </div>
  );
};
export default PlantDetailPage;
