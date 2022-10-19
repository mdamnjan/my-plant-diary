import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import { Fab } from "@mui/material";
import StatusTag from "./StatusTag";
import { useNavigate } from "react-router-dom";

const PlantCardV2 = ({ plant, handleEdit, handleDelete }) => {
  let navigate = useNavigate();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "0 !important",
        position: "relative",
        minHeight: "350px"
      }}
      variant="outlined"
      onClick={() =>
        navigate(`/plants/${plant.slug}/`, { replace: false, state: plant })
      }
    >
      <CardMedia
        sx={{ width: "100%", height: "70%", position: "relative" }}
        component="div"
        image="../../Calathea_orbifolia.jpg"
        children={<StatusTag status={plant.status} />}
        alt={plant.name}
      />
      <CardContent sx={{ height: "20%", minHeight: "125px" }}>
        <Typography gutterBottom variant="h5" component="div">
          {plant.name}
        </Typography>
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
          <EditIcon />
        </Fab>
        <Fab
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(plant);
          }}
          size="medium"
          aria-label="add"
        >
          <DeleteIcon />
        </Fab>
      </CardActions>
    </Card>
  );
};
export default PlantCardV2;
