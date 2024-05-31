import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Skeleton,
  Badge,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// import StatusTag from "./StatusTag";
import "./Plants.css";

const PlantCard = ({ plant, isLoading }) => {
  let navigate = useNavigate();

  return (
    <Card
      className="plant-card"
      sx={{
        margin: "0 !important",
        minWidth: "250px",
        maxWidth: "600px",
        borderRadius: "20px",
        border: "none",
        position: "relative"
      }}
      variant="outlined"
      onClick={() =>
        navigate(`/plants/${plant.slug}/`, { replace: false, state: plant })
      }
    >
      <Badge
        aria-label={`${plant.task_count} tasks`}
        color="primary"
        badgeContent={plant.task_count}
        sx={{ position: "absolute", top:"20px", right: "20px" }}
      />

      {isLoading ? (
        <Skeleton animation="wave" variant="rectangular" />
      ) : (
        <CardMedia
          component="img"
          sx={{ maxHeight: "300px" }}
          image={plant.img_url || "../../Calathea_orbifolia.jpg"}
          alt={plant.name}
        />
      )}
      <CardContent sx={{ backgroundColor: "transparent" }}>
        <Typography
          noWrap
          sx={{
            fontWeight: "bold",
            textOverflow: "ellipsis",
            width: isLoading ? "100%" : "calc(88%)",
          }}
          variant="h5"
          component="h5"
        >
          {isLoading ? <Skeleton /> : plant.name}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default PlantCard;
