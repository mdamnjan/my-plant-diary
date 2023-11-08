import Task from "./Task";
import { performApiCall } from "../../api";

import { Box, Typography, styled } from "@mui/material";
import { Task as MuiTaskIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";

import { updateTask, deleteTask } from "../../api";

const StyledTaskList = styled(Box)(({ empty }) => ({
  width: "100%",
  minHeight: "200px",
  display: empty ? "flex" : "initial",
  justifyContent: empty ? "center" : "initial",
  alignItems: empty ? "center" : "initial",
  flexDirection: empty ? "column" : "inherit",
}));

const TaskIcon = styled(MuiTaskIcon)(() => ({
  fill: "grey",
  height: "35px",
  width: "55px",
}));

const TaskList = (props) => {
  const [tasks, setTasks] = useState([]);

  const getTasks = (plant, overdue, interval) => {
    performApiCall(
      "get",
      `/tasks?plant=${plant || ""}&interval=${interval}&overdue=${
        overdue || false
      }&completed=false`
    ).then((res) => setTasks(res?.data));
  };

  useEffect(() => {
    getTasks(props.plant, props.overdue, props.interval);
  }, [props.interval, props.overdue, props.plant]);

  const handleDelete = (task) => {
    deleteTask(task).then(() =>
      getTasks(props.plant, props.overdue, props.interval)
    );
  };

  const completeTask = (task) => {
    updateTask(task.id, { completed: true }).then(() =>
      getTasks(props.plant, props.overdue, props.interval)
    );
  };

  const handleEdit = (task, body) => {
    updateTask(task.id, body).then(() =>
      getTasks(props.plant, props.overdue, props.interval)
    );
  };

  if (tasks.length === 0) {
    return (
      <StyledTaskList empty>
        <TaskIcon />
        <Typography>No tasks scheduled</Typography>
      </StyledTaskList>
    );
  }

  return tasks.map((task) => (
    <StyledTaskList>
      <Task
        key={task.id}
        task={task}
        {...props}
        handleDelete={handleDelete}
        completeTask={completeTask}
        handleEdit={handleEdit}
      />
    </StyledTaskList>
  ));
};
export default TaskList;
