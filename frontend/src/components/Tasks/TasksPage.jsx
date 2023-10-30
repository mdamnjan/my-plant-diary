import { Tab, Tabs } from "@mui/material";
import { useState, useEffect } from "react";

import "../Notes/Note.css";
import AddButton from "../common/AddButton";
import TaskForm from "./TaskForm";

import { createTask, fetchTasks, deleteTask, updateTask } from "../../api";
import BaseWidget from "../common/BaseWidget";
import TaskList from "./TaskList";
import { performApiCall } from "../../api";

const TasksPage = () => {
  const [open, setOpen] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [tab, setTab] = useState(0);
  const [task, setTask] = useState(null);

  const getTasks = () => {
    fetchTasks().then((response) => {
      if (response.data) {
        setTaskList(response.data);
      }
    });
  };

  console.log(taskList)

  const handleEdit = (task) => {
    setTask(task);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = (task) => {
    deleteTask(task).then(() => getTasks());
  };

  const completeTask = (task) => {
    updateTask(task.id, { completed: true }).then(() => getTasks());
  };

  let overdueTasks = (
    <TaskList
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      completeTask={completeTask}
      overdue={true}
    />
  );

  let todaysTasks = (
    <TaskList
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      completeTask={completeTask}
      interval="today"
    />
  );

  let next7DaysTasks = (
    <TaskList
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      completeTask={completeTask}
      interval="week"
    />
  );

  let next2WeeksTasks = (
    <TaskList
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      completeTask={completeTask}
      interval="2weeks"
    />
  );

  let nextMonthsTasks = (
    <TaskList
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      completeTask={completeTask}
      interval="month"
    />
  );

  const handleSubmit = (e, taskType, plant, taskDate) => {
    const updatePage = () => {
      setOpen(false);
      window.location.reload()
    };

    const body = { type: taskType, plant: plant.id, date: taskDate };
    createTask(body).then(() => updatePage());
  };

  useEffect(() => {
    // getTasks();
    performApiCall("get", "/tasks?interval=week").then((res)=>setTaskList(res.data))
  }, []);

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
            {overdueTasks}
          </BaseWidget>
          <BaseWidget sx={{ marginTop: "20px" }} title="Today's Tasks">
            {todaysTasks}
          </BaseWidget>
        </>
      )}
      {tab === 1 && (
        <>
          <BaseWidget sx={{ marginTop: "20px" }} title="Next 7 days">
            {next7DaysTasks}
          </BaseWidget>
          <BaseWidget sx={{ marginTop: "20px" }} title="Next 2 weeks">
            {next2WeeksTasks}
          </BaseWidget>
          <BaseWidget sx={{ marginTop: "20px" }} title="Next month">
            {nextMonthsTasks}
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
