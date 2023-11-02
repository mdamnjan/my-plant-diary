import Task from "./Task";
import { performApiCall } from "../../api";

import { Box, Typography } from "@mui/material";
import { Task as TaskIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";

const TaskList = (props) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    performApiCall(
      "get",
      `/tasks?plant=${props.plant || ""}&interval=${props.interval}&overdue=${
        props.overdue || false
      }&completed=false`
    ).then((res) => setTasks(res.data));
  }, [props.interval, props.overdue, props.plant]);

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
      <Task key={task.id} task={task} {...props} />
    </Box>
  ));
};
export default TaskList;
