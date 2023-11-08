import Task from "./Task";
import { performApiCall } from "../../api";

import { Box, Typography, styled } from "@mui/material";
import { Task as MuiTaskIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";

import { fetchTasks, updateTask, deleteTask } from "../../api";
import { useQuery, useQueryClient } from "react-query";

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
  const {
    data: tasks,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["tasks", props.plant],
    queryFn: () =>
      fetchTasks(props.plant, props.overdue, props.interval, false),
    initialData: []
  });

  const queryClient = useQueryClient();

  const handleDelete = (task) => {
    deleteTask(task).then(() => queryClient.invalidateQueries([props.plant]));
  };

  const completeTask = (task) => {
    updateTask(task.id, { completed: true }).then(() =>
      queryClient.invalidateQueries([props.plant])
    );
  };

  const handleEdit = (task, body) => {
    updateTask(task.id, body).then(() =>
      queryClient.invalidateQueries([props.plant])
    );
  };

  if (!isLoading && tasks.length === 0) {
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
