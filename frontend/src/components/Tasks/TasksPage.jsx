import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Task as TaskIcon } from "@mui/icons-material";

import "../Notes/Note.css";
import AddButton from "../common/AddButton";
import TaskForm from "./TaskForm";
import Task from "./Task";

import { createTask, fetchTasks, deleteTask, updateTask } from "../../api";
import BaseWidget from "../common/BaseWidget";

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

  const handleEdit = (task) => {
    setTask(task)
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = (task) => {
    deleteTask(task).then(() => getTasks());
  };

  const completeTask = (task) => {
    updateTask(task.id, { completed: true }).then(() => getTasks());
  };

  const TaskList = ({ tasks }) => {
    if (tasks.length === 0) {
      return (
        <Box
          sx={{
            width: "100%",
            minHeight: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="empty-state"
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <TaskIcon sx={{ fill: "grey", height: "35px", width: "55px" }} />
            <Typography>No tasks scheduled</Typography>
          </div>
        </Box>
      );
    }

    return tasks.map((task) => (
      <Box sx={{ width: "100%" }}>
        <Task
          key={task.id}
          task={task}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          completeTask={completeTask}
        />
      </Box>
    ));
  };

  let overdueTasks = (
    <TaskList tasks={taskList.filter((task) => task.overdue)} />
  );

  let todaysTasks = (
    <TaskList
      tasks={taskList.filter((task) => {
        let taskDate = new Date(task.date).toLocaleDateString();
        let todaysDate = new Date().toLocaleDateString();

        console.log(taskDate, todaysDate);

        return taskDate === todaysDate;
      })}
    />
  );

  let next7DaysTasks = (
    <TaskList
      tasks={taskList.filter((task) => {
        let taskDate = new Date(task.date);
        let todaysDate = new Date();

        taskDate.setDate(taskDate.getDate() - 7);

        return taskDate <= todaysDate;
      })}
    />
  );

  let next2WeeksTasks = (
    <TaskList
      tasks={taskList.filter((task) => {
        let taskDate = new Date(task.date);
        let todaysDate = new Date();

        taskDate.setDate(taskDate.getDate() - 14);

        return taskDate <= todaysDate;
      })}
    />
  );

  let nextMonthsTasks = (
    <TaskList
      tasks={taskList.filter((task) => {
        let taskDate = new Date(task.date);
        let todaysDate = new Date();

        taskDate.setMonth(taskDate.getMonth() - 1);

        return taskDate <= todaysDate;
      })}
    />
  );

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
