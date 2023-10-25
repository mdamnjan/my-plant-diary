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
        minHeight: "300px",
        minWidth: "250px",
        maxHeight: "500px",
        maxWidth: "600px",
        borderRadius: "20px",
        backgroundColor: "#d9d9d99e",
        border: "none",
        flexShrink: 1
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
      <CardContent sx={{position: "relative"}}>
        <Typography sx={{position: "absolute", top: "70%", left: "10%", fontWeight: "bold"}} gutterBottom variant="h5" component="div">
          {plant.name}
        </Typography>
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
          right: 20,
          top: 10
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
