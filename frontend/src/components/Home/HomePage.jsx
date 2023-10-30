import { Typography, Box, Card } from "@mui/material";
import { Task as TaskIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";

import { fetchPlants, fetchTasks } from "../../api";
import "./HomePage.css";
import BaseWidget from "../common/BaseWidget";
import PlantCard from "../Plants/PlantCard";
import TaskList from "../Tasks/TaskList";
import NumberWidget from "./NumberWidget";

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
          marginBottom: "10px"
        }}
      >
        <NumberWidget
          data={todaysTasks.length}
          icon={<TaskIcon />}
          subtitle={"tasks today"}
          backgroundColor={"#c5edfa"}
          iconColor={"#3865da"}
        />
        <NumberWidget
          data={todaysTasks.filter((task) => task.completed).length}
          icon={<TaskIcon />}
          subtitle={"tasks completed"}
          backgroundColor={"rgb(164 255 174)"}
          iconColor={"#0fac2a"}
        />
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
          <TaskList interval="today" />
        </BaseWidget>
        <BaseWidget title="Overdue Tasks">
          <TaskList overdue={true} />
        </BaseWidget>
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
