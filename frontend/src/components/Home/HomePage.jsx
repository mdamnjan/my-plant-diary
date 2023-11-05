import { Typography, Box, Card } from "@mui/material";
import { Task as TaskIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";

import { fetchPlants, fetchUser } from "../../api";
import "./HomePage.css";
import BaseWidget from "../common/BaseWidget";
import PlantCard from "../Plants/PlantCard";
import TaskList from "../Tasks/TaskList";
import NumberWidget from "./NumberWidget";
import TaskProgressBar from "../Tasks/TaskProgressBar";

const HomePage = () => {
  const [plants, setPlants] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchUser().then((response) => {
      if (response.data) {
        setUser(response.data);
      }
    });
    fetchPlants().then((response) => {
      if (response.data) {
        setPlants(response.data);
      }
    });
  }, []);

  const tasksLeft = user.task_count - user.completed_task_count;
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
          Welcome back, {user.username}!
        </Typography>
      </Box>
      <Box
        className="progress-widgets"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <BaseWidget sx={{ marginTop: "20px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography>
            {user.completed_task_count}/{user.task_count}
          </Typography>
          <TaskProgressBar resource={user} />
        </BaseWidget>
        <NumberWidget
          data={tasksLeft}
          icon={<TaskIcon />}
          subtitle={tasksLeft === 1 ? "task left" : "tasks left"}
          backgroundColor={"#c5edfa"}
          iconColor={"#3865da"}
        />
        <NumberWidget
          data={user.overdue_task_count}
          icon={<TaskIcon />}
          subtitle={
            user.overdue_task_count === 1 ? "overdue task" : "overdue tasks"
          }
          backgroundColor={"rgb(253 223 156)"}
          iconColor={"#ed8724"}
        />
      </Box>
      <Card
        sx={{
          padding: "20px",
          backgroundColor: "#d9d9d99e",
          borderRadius: "20px",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            marginBottom: "10px",
            display: "inline-block",
          }}
        >
          My Plants
        </Typography>
        <a
          style={{ display: "inline-block", marginLeft: "10px" }}
          href="/plants"
        >
          View All
        </a>
        <Box sx={{ display: "flex", gap: "20px", overflowX: "scroll", padding: "10px" }}>
          {plants.map((plant) => (
            <PlantCard plant={plant} />
          ))}
        </Box>
      </Card>
      <Box
        className="tasks"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <BaseWidget title="Today's Tasks">
          <TaskList interval="today" />
        </BaseWidget>
        <BaseWidget title="Overdue Tasks">
          <TaskList overdue={true} />
        </BaseWidget>
      </Box>
    </div>
  );
};
export default HomePage;
