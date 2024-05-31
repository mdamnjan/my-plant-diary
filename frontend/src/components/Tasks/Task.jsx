import { Delete, Edit, CheckCircle, CircleOutlined, LocalFlorist } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";

import "../Notes/Note.css";
import ConfirmForm from "../Forms/ConfirmForm";
import TaskForm from "../Forms/TaskForm";
import TaskTag from "./TaskTag";

import { getNumDaysUntilDate } from "../../utils";

const PlantName = styled(Typography)(() => ({
  margin: "5px 0px 0px 10px",
  fontWeight: "bold",
}));

const TaskContainer = styled(Card)(() => ({
  marginBottom: "20px",
  borderRadius: "20px",
  padding: "10px",
}));

const ActionButton = styled(IconButton)(() => ({
  padding: "0px",
}));

const TaskTags = styled(CardContent)(() => ({
  paddingTop: 0,
}));

const TaskContent = styled(CardContent)(() => ({
  display: "flex",
  flexGrow: 1,
  justifyContent: "space-between",
}));

const TaskDetails = styled(Box)(() => ({
  display: "flex",
}));

const TaskDueDate = styled(Typography)(() => ({
  margin: "0px 0px 0px 10px",
  fontWeight: "bold",
}));

const Task = ({ task, handleEdit, handleDelete, completeTask, isLoading }) => {
  const [confirmComplete, setConfirmComplete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <TaskContainer>
        <TaskContent>
          <TaskDetails>
            {isLoading ? (
              <Skeleton />
            ) : (
              <Avatar src={task.plant_img}>
                <LocalFlorist/>
              </Avatar>
            )}
            <div>
              <PlantName variant="h6">
                {isLoading ? <Skeleton /> : task.plant_name}
              </PlantName>
              {isLoading ? (
                <Skeleton />
              ) : (
                <Tooltip title={task.date}>
                  <TaskDueDate variant="p">
                    {getNumDaysUntilDate(task.date)}
                  </TaskDueDate>
                </Tooltip>
              )}
            </div>
          </TaskDetails>
          {!isLoading && (
            <CardActions>
              <ActionButton
                onClick={() => setConfirmComplete(true)}
                color={task.completed ? "success" : "default"}
              >
                {task.completed ? <CheckCircle /> : <CircleOutlined />}
              </ActionButton>
              <ActionButton onClick={() => setIsEditing(true)} color="primary">
                <Edit />
              </ActionButton>
              <ActionButton onClick={() => setConfirmDelete(true)}>
                <Delete />
              </ActionButton>
            </CardActions>
          )}
        </TaskContent>
        {!isLoading && (
          <TaskTags>
            <TaskTag type={task.type_display} label={task.type_display} />
            {task.overdue && <TaskTag type="Late" label={task.type_display} />}
          </TaskTags>
        )}
      </TaskContainer>
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
