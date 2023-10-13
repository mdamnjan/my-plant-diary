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

const Task = ({ task, handleEdit }) => {
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

          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          <Avatar src={task.plant_img || "../../Calathea_orbifolia.jpg"} />
        </CardContent>
        <CardContent
          sx={{
            paddingLeft: '0px',
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            flexGrow: 1,

          }}
        >
          <div>
            <h3 style={{ margin: "5px 0px 0px 10px" }}>
              {task.plant_name || "plant name"}
            </h3>
          </div>
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
        <CardActions>
          <IconButton
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
