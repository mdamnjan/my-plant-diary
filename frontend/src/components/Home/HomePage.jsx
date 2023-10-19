import { Typography, Box } from "@mui/material";
import { LocalFlorist, Task, Warning } from "@mui/icons-material";
import { useEffect, useState } from "react";

import AlertsWidget from "./AlertsWidget";
import NumberWidget from "./NumberWidget";
import TaskWidget from "./TaskWidget";

import { fetchPlants, fetchTasks } from "../../api";
import "./HomePage.css";

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

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography variant="h2">Overview</Typography>
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
        <NumberWidget
          data={plants.length}
          subtitle={"Total plants"}
          icon={<LocalFlorist />}
          backgroundColor={"#d8ffd8"}
          iconColor={"green"}
        />
        <NumberWidget
          data={2}
          subtitle={"Tasks today"}
          icon={<Task />}
          backgroundColor={"#c5edfa"}
          iconColor={"#3865da"}
        />
        <NumberWidget
          data={5}
          subtitle={"Alerts"}
          icon={<Warning />}
          backgroundColor={"rgb(255 210 127)"}
          iconColor={"#f67a52"}
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
        <AlertsWidget plants={plants} />
        <TaskWidget tasks={tasks} />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "20px",
        }}
      ></Box>
    </div>
  );
};
export default HomePage;
