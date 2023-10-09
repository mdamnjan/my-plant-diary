import { fetchNotes, fetchPlants, fetchWateringEntries } from "../Plants/utils";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";

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
      <Box>Hi</Box>
    </div>
  );
};
export default HomePage;
