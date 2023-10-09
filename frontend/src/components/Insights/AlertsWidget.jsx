import { useNavigate } from "react-router-dom";
import { Paper, Chip } from "@mui/material";
import { Error } from "@mui/icons-material";

const AlertsWidget = ({ plants }) => {
  const navigate = useNavigate();
  return (
    <Paper
      sx={{
        flex: "1 1 50%",
        padding: "15px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ margin: 0 }}>Alerts</h3>
        <a href="/tasks">View All</a>
      </div>
      <span>These plants need your attention!</span>
      {plants.slice(0, 5).map((plant) => (
        <div
          onClick={() =>
            navigate(`/plants/${plant.slug}`, { replace: false, state: plant })
          }
          style={{
            display: "flex",
            alignItems: "center",
            borderRadius: "30px",
            backgroundColor: "rgb(225 223 223)",
            margin: "10px 0px",
            padding: "5px 10px 5px 5px",
            position: "relative",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={"../../Calathea_orbifolia.jpg"}
              alt="plant"
              style={{
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                marginRight: "5px",
              }}
            ></img>
            {plant.name}
          </div>
          <Chip
            icon={<Error sx={{ fill: "white" }} />}
            label="Needs Water"
            sx={{ backgroundColor: "#ff0808", color: "white" }}
          />
        </div>
      ))}
    </Paper>
  );
};
export default AlertsWidget;
