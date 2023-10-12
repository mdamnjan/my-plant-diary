import { Typography, Box } from "@mui/material";
import { LocalFlorist, Task, Warning } from "@mui/icons-material";
import { useEffect, useState } from "react";

import AlertsWidget from "./AlertsWidget";
import NumberWidget from "./NumberWidget";
import PlantCard from "../Plants/PlantCard";
import TaskWidget from "./TaskWidget";

import { fetchNotes, fetchPlants, fetchWateringEntries } from "../Plants/utils";

const HomePage = () => {
  const [plants, setPlants] = useState([]);
  const [entries, setEntries] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchPlants().then((response) => setPlants(response.data));
    fetchWateringEntries().then((response) => setEntries(response.data));
    fetchNotes().then((response) => setNotes(response.data));
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
      <Typography>Plants</Typography>
      <a href="/plants">View All</a>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          gap: "10px",
          overflowX: "auto",
        }}
      >
        {plants.slice(0, 3).map((plant) => (
          <PlantCard style={{ width: "300px !important" }} plant={plant} />
        ))}
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <AlertsWidget plants={plants} />
        <TaskWidget />
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
