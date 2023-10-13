import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Fab,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import StatusTag from "./StatusTag";

const PlantCard = ({ plant, handleEdit, handleDelete }) => {
  let navigate = useNavigate();

  console.log("plant", plant)

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "0 !important",
        position: "relative",
        minHeight: "250px",
        minWidth: "250px",
        maxHeight: "350px"
      }}
      variant="outlined"
      onClick={() =>
        navigate(`/plants/${plant.slug}/`, { replace: false, state: plant })
      }
    >
      <CardMedia
        sx={{ width: "100%", height: "70%", position: "relative" }}
        component="div"
        image={plant.img_url || "../../Calathea_orbifolia.jpg"}
        children={<StatusTag status={plant.status_display} />}
        alt={plant.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {plant.name}
        </Typography>
        {/* <Typography variant="body1" color="text.secondary">
          Last Watered: {plant.last_watered}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Next Watering: {plant.next_watering}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Watering Frequency: {plant.watering_frequency}
        </Typography> */}
      </CardContent>
      <CardActions
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "end",
          margin: "0 !important",
          position: "absolute",
          right: 0,
        }}
      >
        <Fab
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(plant);
          }}
          color="primary"
          size="medium"
          aria-label="add"
        >
          <Edit />
        </Fab>
        <Fab
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(plant);
          }}
          size="medium"
          aria-label="add"
        >
          <Delete />
        </Fab>
      </CardActions>
    </Card>
  );
};
export default PlantCard;
