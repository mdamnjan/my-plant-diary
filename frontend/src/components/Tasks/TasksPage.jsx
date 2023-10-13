import { Divider, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

import "../Notes/Note.css";
import AddButton from "../common/AddButton";
import TaskForm from "./TaskForm";
import Task from "./Task";

import { createTask, fetchTasks } from "../../api";

const TasksPage = () => {
  const [open, setOpen] = useState(false);
  const [taskList, setTaskList] = useState([]);

  const completedTaskList = taskList.filter((task) => task.completed);
  const uncompletedTaskList = taskList.filter((task) => !task.completed);

  let completedTasks = completedTaskList.map((task) => (
    <Box sx={{ width: "100%" }}>
      <Task key={task.id} task={task} />
    </Box>
  ));

  let tasks = uncompletedTaskList.map((task) => (
    <Box sx={{ width: "100%" }}>
      <Task key={task.id} task={task} />
    </Box>
  ));

  const getTasks = () => {
    fetchTasks().then((response) => {
      if (response.data) {
        setTaskList(response.data);
      }
    });
  };

  const handleSubmit = (e, taskType, plant, taskDate) => {
    const updatePage = () => {
      setOpen(false);
      getTasks();
    };

    const body = { type: taskType, plant: plant.id, date: taskDate };
    createTask(body).then(() => updatePage());
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h2">Tasks</Typography>
      </Box>
      <Divider />
      <Typography variant="h5">Overdue</Typography>
      <div style={{ margin: "20px auto" }}>{tasks.slice(0, 2)}</div>
      <Typography variant="h5">Upcoming</Typography>
      <div style={{ margin: "20px auto" }}>{tasks}</div>
      <Typography variant="h5">Completed</Typography>
      <div style={{ margin: "20px auto" }}>{completedTasks}</div>
      <AddButton onClick={() => setOpen(true)} tooltipText={"Add a task"} />
      <TaskForm
        handleSubmit={handleSubmit}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
export default TasksPage;
