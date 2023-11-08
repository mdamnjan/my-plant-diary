import { Tab, Tabs, styled } from "@mui/material";
import { useState } from "react";

import "../Notes/Note.css";
import AddButton from "../common/AddButton";
import TaskForm from "../Forms/TaskForm";

import { createTask } from "../../api";
import BaseWidget from "../common/BaseWidget";
import TaskList from "./TaskList";

// uses sx because the styling isn't being passed down with styled
// See https://mui.com/system/styled/#difference-with-the-sx-prop
const StyledWidget = (props) => (
  <BaseWidget sx={{ marginTop: "20px" }}>{props.children}</BaseWidget>
);

const StyledTab = styled(Tab)(() => ({
  flex: "1 1 0",
}));

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
        <StyledTab label="Today" />
        <StyledTab label="Upcoming" />
      </Tabs>
      {tab === 0 && (
        <>
          <StyledWidget title="Overdue Tasks">
            <TaskList handleEdit={handleEdit} overdue={true} />
          </StyledWidget>
          <StyledWidget title="Today's Tasks">
            <TaskList handleEdit={handleEdit} interval="today" />
          </StyledWidget>
        </>
      )}
      {tab === 1 && (
        <>
          <StyledWidget title="Next 7 days">
            <TaskList handleEdit={handleEdit} interval="week" />
          </StyledWidget>
          <StyledWidget title="Next 2 weeks">
            <TaskList handleEdit={handleEdit} interval="2weeks" />
          </StyledWidget>
          <StyledWidget title="Next month">
            <TaskList handleEdit={handleEdit} interval="month" />
          </StyledWidget>
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
