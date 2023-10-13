import { useNavigate } from "react-router-dom";
import { Paper, Chip } from "@mui/material";

const TaskWidget = ({ tasks }) => {
  const navigate = useNavigate();

  const getTagColor = (type) => {
    switch (type) {
      case "Water":
        return "#4444ff";
      case "Repot":
        return "#a03f0b";
      case "Propagate":
        return "#7ca118";
      default:
        return "#ff7d20";
    }
  };

  let tasksShown = tasks.length > 5? tasks.slice(0, 5) : tasks;

  return (
    <Paper
      sx={{
        flex: "1 1 50%",
        padding: "15px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ margin: 0 }}>Tasks</h3>
        <a href="/tasks">View All</a>
      </div>
      <span>Upcoming tasks</span>
      {tasksShown.map((task) => (
        <div
          onClick={() =>
            navigate(`/plants/${task.plant.slug}`, {
              replace: false,
              state: task.plant,
            })
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
              src={task.plant_img || "../../Calathea_orbifolia.jpg"}
              alt="plant"
              style={{
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                marginRight: "5px",
              }}
            ></img>
            {task.plant_name}
          </div>
          <Chip
            label={task.type_display}
            sx={{ backgroundColor: getTagColor(task.type_display), color: "white" }}
          />
        </div>
      ))}
    </Paper>
  );
};
export default TaskWidget;
