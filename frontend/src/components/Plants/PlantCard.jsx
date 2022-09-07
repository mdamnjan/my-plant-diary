import StatusTag from "./StatusTag";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const PlantCard = ({ plant, handleEdit, handleDelete }) => {
  let navigate = useNavigate();
  return (
    <div
      className="plant-card"
      onClick={() =>
        navigate(`/plants/${plant.id}/`, { replace: true, state: plant })
      }
    >
      <div className="image-gallery">
        <img src="../../Calathea_orbifolia.jpg"></img>
      </div>
      <div className="plant-info-section">
        <div className="plant-actions">
          <IconButton
            onClick={() => handleEdit(plant)}
            className="plant-action-button"
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(plant)}
            className="plant-action-button"
          >
            <DeleteIcon />
          </IconButton>
        </div>
        <h2>{plant.name}</h2>
        <StatusTag status={plant.status} />
        <h4>Last Note:</h4>
        <p>
          One of the leaves looked a little bit yellow, I'm thinking I may have
          overwatered
        </p>
      </div>
    </div>
  );
};
export default PlantCard;
