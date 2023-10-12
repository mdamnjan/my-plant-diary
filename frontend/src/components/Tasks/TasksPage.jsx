import { Divider, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

import "../Notes/Note.css";
import AddButton from "../common/AddButton";
import NoteForm from "../Notes/NoteForm";
import Task from "./Task";

import { fetchNotes, createNote } from "../Plants/utils";
import { tasks as dummyTasks } from "../../dummyData";

const TasksPage = () => {
  const [open, setOpen] = useState(false);
  const [taskList, setTaskList] = useState(dummyTasks);

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

  const getNotes = () => {
    fetchNotes().then((response) => setTaskList(response.data));
  };

  const handleSubmit = (e, text, plant) => {
    const updatePage = () => {
      setOpen(false);
      getNotes();
    };

    const body = { text: text, plant: plant.id };
    createNote(body).then(() => updatePage());
  };

  useEffect(() => {
    getNotes();
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
      <NoteForm
        handleSubmit={handleSubmit}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
export default TasksPage;
