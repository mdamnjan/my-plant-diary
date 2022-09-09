import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const PlantCardV2 = ({ plant, handleEdit, handleDelete }) => {
  return (
    <Card sx={{ display: "flex", margin: '0 !important', minHeight: '40%' }} variant="outlined">
      <CardMedia
        sx={{ width: "20%" }}
        component="img"
        image="../../Calathea_orbifolia.jpg"
        alt={plant.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions sx={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'end', margin: '0 !important'}}>
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
