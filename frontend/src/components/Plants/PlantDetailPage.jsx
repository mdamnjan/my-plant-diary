import {
  WaterDrop,
  Task as MuiTask,
  Note as MuiNote,
} from "@mui/icons-material";
import { Typography, Tabs, Tab, Box } from "@mui/material";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  createWateringEntry,
  fetchPlant,
  fetchWateringEntries,
  fetchNotes,
  fetchTasks,
} from "../../api";

import AddButton from "../common/AddButton";
import WateringEntryForm from "./WateringEntryForm";
import WateringLineChart from "./WateringLineChart";
import Task from "../Tasks/Task";
import Note from "../Notes/Note";

const PlantDetailPage = () => {
  const location = useLocation();
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);

  const [plant, setPlant] = useState(null);
  const [entries, setEntries] = useState([]);
  const [notes, setNotes] = useState([]);
  const [tasks, setTasks] = useState([])

  const getWateringEntries = () => {
    fetchWateringEntries().then((response) => {
      if (response.data) {
        setEntries(response.data);
      }
    });
  };

  const getNotes = () => {
    fetchNotes().then((response) => {
      if (response.data) {
        setNotes(response.data);
      }
    });
  };

  const getTasks = () => {
    fetchTasks().then((response) => {
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
    getNotes();
    getTasks()
  }, [location.state]);

  return (
    <div className="plant-detail-container">
      <Typography variant="h5">{plant?.name}</Typography>
      <img
        alt="plant"
        src={plant?.img_url || "../../Calathea_orbifolia.jpg"}
        style={{ objectFit: "contain", backgroundColor: "grey" }}
      ></img>
      <Box sx={{ width: "100%", margin: "auto" }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          aria-label="icon label tabs example"
        >
          <Tab sx={{ flex: "1 1 0" }} icon={<WaterDrop />} label="Water" />
          <Tab sx={{ flex: "1 1 0" }} icon={<MuiNote />} label="Notes" />
          <Tab sx={{ flex: "1 1 0" }} icon={<MuiTask />} label="Tasks" />
        </Tabs>
      </Box>
      {tab === 0 && (
        <>
          <Typography variant="body1">
            Last Watered: {plant?.last_watered}
          </Typography>
          <Typography variant="body1">
            Next Watering: {plant?.next_watering}
          </Typography>
          <Typography variant="body1">
            Watering Frequency: {plant?.watering_frequency}
          </Typography>
          {entries.length > 0 && <WateringLineChart entries={entries} />}
        </>
      )}
      {tab === 1 && notes.map((note) => <Note note={note} />)}
      {tab === 2 && tasks.map((task) => <Task task={task} />)}
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
