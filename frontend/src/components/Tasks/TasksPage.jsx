import { Tab, Tabs } from "@mui/material";
import { useState } from "react";

import "../Notes/Note.css";
import AddButton from "../common/AddButton";
import TaskForm from "../Forms/TaskForm";

import { createTask } from "../../api";
import BaseWidget from "../common/BaseWidget";
import TaskList from "./TaskList";

const TasksPage = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tab, setTab] = useState(0);
  const [task, setTask] = useState(null);

  const handleEdit = (task) => {
    setTask(task);
    setIsEditing(true);
    setOpen(true);
  };

  const handleSubmit = (e, taskType, plant, taskDate) => {
    const updatePage = () => {
      setOpen(false);
      window.location.reload();
    };

    const body = { type: taskType, plant: plant.id, date: taskDate };
    createTask(body).then(() => updatePage());
  };

  return (
    <>
      <Tabs
        sx={{ width: "100%" }}
        value={tab}
        onChange={(e, selectedTab) => setTab(selectedTab)}
        aria-label="icon label tabs example"
      >
        <Tab sx={{ flex: "1 1 0" }} label="Today" />
        <Tab sx={{ flex: "1 1 0" }} label="Upcoming" />
      </Tabs>
      {tab === 0 && (
        <>
          <BaseWidget sx={{ marginTop: "20px" }} title="Overdue Tasks">
            <TaskList handleEdit={handleEdit} overdue={true} />
          </BaseWidget>
          <BaseWidget sx={{ marginTop: "20px" }} title="Today's Tasks">
            <TaskList handleEdit={handleEdit} interval="today" />
          </BaseWidget>
        </>
      )}
      {tab === 1 && (
        <>
          <BaseWidget sx={{ marginTop: "20px" }} title="Next 7 days">
            <TaskList handleEdit={handleEdit} interval="week" />
          </BaseWidget>
          <BaseWidget sx={{ marginTop: "20px" }} title="Next 2 weeks">
            <TaskList handleEdit={handleEdit} interval="2weeks" />
          </BaseWidget>
          <BaseWidget sx={{ marginTop: "20px" }} title="Next month">
            <TaskList handleEdit={handleEdit} interval="month" />
          </BaseWidget>
        </>
      )}
      <AddButton onClick={() => setOpen(true)} tooltipText={"Add a task"} />
      <TaskForm
        task={task}
        isEditing={isEditing}
        handleSubmit={handleSubmit}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
export default TasksPage;
