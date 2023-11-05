import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// import StatusTag from "./StatusTag";
import "./Plants.css";
import TaskProgressBar from "../Tasks/TaskProgressBar";

const PlantCard = ({ plant }) => {
  let navigate = useNavigate();

  console.log("plant", plant);

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
        border: "none",
        flexShrink: 1,
        boxShadow:
          "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
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
        // children={<StatusTag status={plant.status_display} />}
        alt={plant.name}
      />
      <CardContent sx={{ position: "relative" }}>
        <Typography
          noWrap
          sx={{
            position: "absolute",
            top: "70%",
            fontWeight: "bold",
            textOverflow: "ellipsis",
            width: "calc(88%)"
          }}
          gutterBottom
          variant="h5"
          component="h5"
        >
          {plant.name}
        </Typography>
        <TaskProgressBar resource={plant} />
      </CardContent>
      {/* <CardActions
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "end",
          margin: "0 !important",
          position: "absolute",
          right: 20,
          top: 10,
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
      </CardActions> */}
    </Card>
  );
};
export default PlantCard;
