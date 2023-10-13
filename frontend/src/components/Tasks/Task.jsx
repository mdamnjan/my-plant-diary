import { Delete, Edit, CheckCircle, CircleOutlined } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
} from "@mui/material";

import "../Notes/Note.css";
import { deleteTask } from "../../api";

const Task = ({ task }) => {
  const getTagColor = (type) => {
    switch (type) {
      case "Water":
        return "#4444ff";
      case "Repot":
        return "#a03f0b";
      case "Prune":
        return "#7ca118";
      default:
        return "#ff7d20";
    }
  };

  return (
    <>
      <Card
        sx={{
          marginBottom: "20px",
          minWidth: "260px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <CardContent sx={{ display: "flex" }}>
          <div>
            <Avatar src={task.plant_img || "../../Calathea_orbifolia.jpg"} />
          </div>
          <div>
            <h3 style={{ margin: "5px 0px 0px 10px" }}>
              {task.plant_name || "plant name"}
            </h3>
          </div>
          <Chip
            sx={{
              backgroundColor: getTagColor(task.type_display),
              color: "white",
              margin: "3px 0px 0px 5px",
            }}
            label={task.type_display}
          />
        </CardContent>
        <CardActions>
          <IconButton
            sx={{ padding: "0px" }}
            color={task.completed ? "success" : "default"}
          >
            {task.completed ? <CheckCircle /> : <CircleOutlined />}
          </IconButton>
          <IconButton color="primary" sx={{ padding: "0px" }}>
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => deleteTask(task.id)}
            color="default"
            sx={{ padding: "0px" }}
          >
            <Delete />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};
export default Task;
