import {
  WaterDrop,
  Task as MuiTask,
  Note as MuiNote,
  ArrowBack,
} from "@mui/icons-material";
import {
  Typography,
  Tabs,
  Tab,
  Box,
  IconButton,
  Skeleton,
} from "@mui/material";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import NotesTab from "./Tabs/NotesTab";
import TasksTab from "./Tabs/TasksTab";
import OverviewTab from "./Tabs/OverviewTab";

import { useQuery } from "react-query";

import { fetchPlant } from "../../../api";

const PlantDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState(0);
  const plantId = location.state.id;

  const {
    data: plant,
    isLoading,
  } = useQuery({
    queryKey: [`plant${plantId}`],
    queryFn: () => fetchPlant(plantId),
  });

  const handleChange = (e, newValue) => {
    setTab(newValue);
  };

  return (
    <div className="plant-detail-container">
      <Typography variant="h5">
        <IconButton
          sx={{ marginLeft: "-20px", marginRight: "5px" }}
          onClick={() => navigate("/plants")}
        >
          <ArrowBack />
        </IconButton>
        {isLoading ? (
          <Skeleton sx={{ width: 300, display: "inline-block" }} />
        ) : (
          plant.name
        )}
      </Typography>
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          sx={{ maxHeight: 700, minHeight: 400, borderRadius: "20px" }}
        />
      ) : (
        <img
          alt="plant"
          src={plant.img_url}
          style={{
            objectFit: "contain",
            backgroundColor: "rgb(123 123 123 / 62%)",
            borderRadius: "20px",
          }}
        ></img>
      )}
      <Box sx={{ width: "100%", margin: "auto" }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          aria-label="icon label tabs example"
        >
          <Tab sx={{ flex: "1 1 0" }} icon={<WaterDrop />} label="Overview" />
          <Tab sx={{ flex: "1 1 0" }} icon={<MuiNote />} label="Notes" />
          <Tab sx={{ flex: "1 1 0" }} icon={<MuiTask />} label="Tasks" />
        </Tabs>
      </Box>
      {isLoading && <Skeleton variant="rectangular" sx={{ height: 500 }} />}
      {tab === 0 && !isLoading && <OverviewTab plant={plant} />}
      {tab === 1 && !isLoading && <NotesTab plant={plant.id} />}
      {tab === 2 && !isLoading && <TasksTab plant={plant.id} />}
    </div>
  );
};
export default PlantDetailPage;
