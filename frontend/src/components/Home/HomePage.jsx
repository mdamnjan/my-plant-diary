import { Typography, Box } from "@mui/material";
import { LocalFlorist, Task, Warning } from "@mui/icons-material";
import { useEffect, useState } from "react";

import AlertsWidget from "./AlertsWidget";
import NumberWidget from "./NumberWidget";
import PlantCard from "../Plants/PlantCard";
import TaskWidget from "./TaskWidget";

import { fetchPlants } from "../Plants/utils";

const HomePage = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetchPlants().then((response) => {
      if (response.data) {
        setPlants(response.data);
      }
    });
  }, []);

  console.log("plants", plants)

  let plantList = plants.length >= 3 ? plants.slice(0, 3) : plants;
  console.log("plantlist", plantList)
  plantList = plantList.map((plant) => (
    <PlantCard style={{ width: "300px !important" }} plant={plant} />
  ));

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
        {plantList}
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
