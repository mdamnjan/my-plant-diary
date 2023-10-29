import { Typography, Box, Card, CardContent } from "@mui/material";
import { ArrowForwardIos, Task as TaskIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";

import Task from "../Tasks/Task";

import { fetchPlants, fetchTasks } from "../../api";
import "./HomePage.css";
import BaseWidget from "../common/BaseWidget";
import PlantCard from "../Plants/PlantCard";
import TaskList from "../Tasks/TaskList";

const HomePage = () => {
  const [plants, setPlants] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchPlants().then((response) => {
      if (response.data) {
        setPlants(response.data);
      }
    });
    fetchTasks().then((response) => {
      if (response.data) {
        setTasks(response.data);
      }
    });
  }, []);

  const todaysTasks = tasks.filter((task) => {
    let today = new Date();
    let taskDate = new Date(task.date);

    let difference = today - taskDate;

    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Convert back to days and return
    let numDays = Math.floor(difference / ONE_DAY);

    return numDays === 0;
  });

  const overdueTaskWidget = (
    <BaseWidget title="Overdue Tasks">
      {tasks
        .filter((task) => task.overdue)
        .map((task) => (
          <Task task={task} />
        ))}
    </BaseWidget>
  );

  const taskProgressWidget = (
    <Card
      sx={{
        backgroundColor: "#d9d9d99e",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "end" }}>
          <div
            style={{
              width: "65px",
              height: "65px",
              borderRadius: "50%",
              backgroundColor: "green",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            <TaskIcon
              width={"75px"}
              sx={{ fill: "white", width: "65px", height: "45px" }}
            />
          </div>
          <div>
            <Typography variant="h4">{todaysTasks.length}</Typography>
            <Typography
              variant="span"
              sx={{ maxWidth: "50px", display: "block" }}
            >
              tasks completed
            </Typography>
          </div>
        </div>
        <ArrowForwardIos />
        <div style={{ display: "flex", alignItems: "end", marginLeft: "20px" }}>
          <div
            style={{
              width: "65px",
              height: "65px",
              borderRadius: "50%",
              backgroundColor: "blue",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            <TaskIcon
              width={"75px"}
              sx={{ fill: "white", width: "65px", height: "45px" }}
            />
          </div>
          <div>
            <Typography variant="h4">{todaysTasks.length}</Typography>
            <Typography
              variant="span"
              sx={{ maxWidth: "80px", display: "block" }}
            >
              tasks left
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <img
          src="plant-logo.png"
          alt="a potted plant illustration"
          style={{ width: "50px", height: "50px" }}
        ></img>
        <Typography
          variant="h5"
          sx={{ display: "inline-block", verticalAlign: "bottom" }}
        >
          Welcome back!
        </Typography>
      </Box>
      <Box
        className="widgets"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <BaseWidget title="Today's Tasks">
          <TaskList tasks={tasks} />
        </BaseWidget>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {taskProgressWidget}
          {overdueTaskWidget}
        </div>
      </Box>
      <Card
        sx={{
          padding: "20px",
          backgroundColor: "#d9d9d99e",
          borderRadius: "20px",
          overflowX: "scroll",
          width: "100%",
          marginTop: "10px"
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", marginBottom: "10px" }}
        >
          My Plants
        </Typography>
        <Box sx={{ display: "flex", gap: "20px" }}>
          {plants.map((plant) => (
            <PlantCard plant={plant} />
          ))}
        </Box>
      </Card>
    </div>
  );
};
export default HomePage;
