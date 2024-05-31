import Task from "./Task";

import { Box, Typography, styled } from "@mui/material";
import { Task as MuiTaskIcon } from "@mui/icons-material";

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
  height: "35px",
  width: "55px",
}));

const TaskList = (props) => {

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

  if (!props.tasks || props.tasks.length === 0) {
    return (
      <StyledTaskList empty>
        <TaskIcon />
        <Typography>No tasks scheduled</Typography>
      </StyledTaskList>
    );
  }

  return props.tasks.map((task) => (
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
