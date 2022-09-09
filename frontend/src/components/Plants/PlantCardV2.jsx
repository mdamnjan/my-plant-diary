import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import StatusTag from "./StatusTag";
import {useNavigate} from "react-router-dom"

const PlantCardV2 = ({ plant, handleEdit, handleDelete }) => {
    let navigate = useNavigate();

  return (
    <Card
      sx={{
        display: "flex",
        margin: "0 !important",
        minHeight: "40%",
        position: "relative",
      }}
      variant="outlined"
      onClick={() =>
        navigate(`/plants/${plant.id}/`, { replace: true, state: plant })
      }
    >
      <CardMedia
        sx={{ width: "20%" }}
        component="img"
        image="../../Calathea_orbifolia.jpg"
        alt={plant.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {plant.name}
        </Typography>
        <StatusTag status={plant.status} />
        <Typography variant="body1" color="text.secondary">
          Last Watered: {plant.last_watered}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Next Watering: {plant.next_watering}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Watering Frequency: {plant.watering_frequency}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "end",
          margin: "0 !important",
        }}
      >
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(plant);
          }}
          color="primary"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(plant);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default PlantCardV2;
