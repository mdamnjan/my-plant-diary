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

const Task = ({ task, handleEdit, handleDelete, completeTask }) => {
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
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexGrow: 1,
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            <Avatar src={task.plant_img || "../../Calathea_orbifolia.jpg"} />
            <div>
              <h3 style={{ margin: "5px 0px 0px 10px" }}>
                {task.plant_name || "plant name"}
              </h3>
            </div>
          </div>
          <CardActions>
            <IconButton
              onClick={() => completeTask(task)}
              sx={{ padding: "0px" }}
              color={task.completed ? "success" : "default"}
            >
              {task.completed ? <CheckCircle /> : <CircleOutlined />}
            </IconButton>
            <IconButton
              onClick={handleEdit}
              color="primary"
              sx={{ padding: "0px" }}
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(task.id)}
              color="default"
              sx={{ padding: "0px" }}
            >
              <Delete />
            </IconButton>
          </CardActions>
        </CardContent>
        <CardContent sx={{ paddingTop: 0 }}>
          <div>
            <Chip
              sx={{
                backgroundColor: getTagColor(task.type_display),
                color: "white",
                margin: "3px 0px 0px 0px",
              }}
              label={task.type_display}
            />
            {task.overdue && (
              <Chip
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  margin: "3px 0px 0px 0px",
                }}
                label="Late"
              />
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default Task;
