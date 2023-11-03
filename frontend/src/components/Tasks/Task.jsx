import { Delete, Edit, CheckCircle, CircleOutlined } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";

import "../Notes/Note.css";
import ConfirmForm from "../Forms/ConfirmForm";
import TaskForm from "../Forms/TaskForm";

import { useState } from "react";

const Task = ({ task, handleEdit, handleDelete, completeTask }) => {
  const [confirmComplete, setConfirmComplete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  const getNumDaysUntilDue = (date) => {
    let dueDate = new Date(date);
    let today = new Date();

    let difference = new Date(today - dueDate);

    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Convert back to days and return
    let numDays = Math.abs(Math.floor(difference / ONE_DAY));

    if (numDays === 0) {
      return "Due today";
    }

    if (dueDate < today) {
      return `${numDays} days late`;
    }

    return `Due in ${numDays} days`;
  };

  return (
    <>
      <Card
        sx={{
          marginBottom: "20px",
          borderRadius: "20px",
          padding: "10px",
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
              <h3 style={{ margin: "5px 0px 0px 10px", maxWidth: "100px" }}>
                {task.plant_name || "plant name"}
              </h3>
              <Tooltip title={task.date}>
                <h5 style={{ margin: "0px 0px 0px 10px" }}>
                  {getNumDaysUntilDue(task.date)}
                </h5>
              </Tooltip>
            </div>
          </div>
          <CardActions>
            <IconButton
              onClick={() => setConfirmComplete(true)}
              sx={{ padding: "0px" }}
              color={task.completed ? "success" : "default"}
            >
              {task.completed ? <CheckCircle /> : <CircleOutlined />}
            </IconButton>
            <IconButton
              onClick={() => setIsEditing(true)}
              color="primary"
              sx={{ padding: "0px" }}
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={() => setConfirmDelete(true)}
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
                  margin: "3px 0px 0px 10px",
                }}
                label="Late"
              />
            )}
          </div>
        </CardContent>
      </Card>
      <TaskForm
        open={isEditing}
        isEditing={isEditing}
        onClose={() => setIsEditing(false)}
        handleSubmit={handleEdit}
        task={task}
      ></TaskForm>
      <ConfirmForm
        title="Complete task?"
        buttonText="Complete"
        open={confirmComplete}
        onClose={() => setConfirmComplete(false)}
        handleSubmit={() => completeTask(task)}
      ></ConfirmForm>
      <ConfirmForm
        title="Delete task?"
        buttonText="Delete"
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        handleSubmit={() => handleDelete(task.id)}
      ></ConfirmForm>
    </>
  );
};
export default Task;
