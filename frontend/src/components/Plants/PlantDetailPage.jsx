import {
  WaterDrop,
  Task as MuiTask,
  Note as MuiNote,
  ArrowBack,
} from "@mui/icons-material";
import { Typography, Tabs, Tab, Box, IconButton } from "@mui/material";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  createWateringEntry,
  fetchPlant,
  fetchWateringEntries,
  fetchNotes,
  fetchTasks,
} from "../../api";

import AddButton from "../common/AddButton";
import WateringEntryForm from "./WateringEntryForm";
import NotesTab from "./PlantDetails/Tabs/NotesTab";
import TasksTab from "./PlantDetails/Tabs/TasksTab";
import OverviewTab from "./PlantDetails/Tabs/OverviewTab";

const PlantDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);

  const [plant, setPlant] = useState(null);
  const [entries, setEntries] = useState([]);
  const [notes, setNotes] = useState([]);
  const [tasks, setTasks] = useState([]);

  console.log(tasks)

  const getWateringEntries = () => {
    fetchWateringEntries().then((response) => {
      if (response.data) {
        setEntries(response.data);
      }
    });
  };

  const getNotes = (plant) => {
    fetchNotes(plant).then((response) => {
      if (response.data) {
        setNotes(response.data);
      }
    });
  };

  const getTasks = (plant) => {
    fetchTasks(plant).then((response) => {
      if (response.data) {
        setTasks(response.data);
      }
    });
  };

  const getPlant = (plantID) => {
    fetchPlant(plantID).then((response) => {
      if (response.data) {
        setPlant(response.data);
      }
    });
  };

  const handleSubmit = (body) => {
    createWateringEntry(body).then(() => {
      getWateringEntries();
      setOpen(false);
    });
  };

  const handleChange = (e, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    getWateringEntries();
    getPlant(location.state.id);
    getNotes(location.state.id);
    getTasks(location.state.id);
  }, [location.state]);

  return (
    <div className="plant-detail-container">
      <Typography variant="h5">
        <IconButton
          sx={{ marginLeft: "-20px", marginRight: "5px" }}
          onClick={() => navigate("/plants")}
        >
          <ArrowBack />
        </IconButton>
        {plant?.name}
      </Typography>
      <img
        alt="plant"
        src={plant?.img_url || "../../Calathea_orbifolia.jpg"}
        style={{
          objectFit: "contain",
          backgroundColor: "rgb(123 123 123 / 62%)",
          borderRadius: "20px",
        }}
      ></img>
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
      {tab === 0 && <OverviewTab plant={plant} entries={entries}/>}
      {tab === 1 && <NotesTab notes={notes} />}
      {tab === 2 && <TasksTab plant={plant.id} />}
      <WateringEntryForm
        open={open}
        onClose={() => setOpen(false)}
        plant={plant}
        handleSubmit={handleSubmit}
      />
      <AddButton
        tooltipText="Log a watering entry"
        onClick={() => setOpen(true)}
      />
    </div>
  );
};
export default PlantDetailPage;
