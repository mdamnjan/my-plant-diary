import Task from "./Task";
import { performApiCall } from "../../api";

import { Box, Typography } from "@mui/material";
import { Task as TaskIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";

import { updateTask, deleteTask } from "../../api";

const TaskList = (props) => {
  const [tasks, setTasks] = useState([]);

  const getTasks = (plant, overdue, interval) => {
    performApiCall(
      "get",
      `/tasks?plant=${plant || ""}&interval=${interval}&overdue=${
        overdue || false
      }&completed=false`
    ).then((res) => setTasks(res.data));
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
        {...props}
        handleDelete={handleDelete}
        completeTask={completeTask}
        handleEdit={handleEdit}
      />
    </Box>
  ));
};
export default TaskList;
