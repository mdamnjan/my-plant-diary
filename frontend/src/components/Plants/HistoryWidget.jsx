import { Card, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import "./Plants.css";
import { fetchWateringEntries } from "./utils";

const HistoryWidget = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchWateringEntries().then((response) => setEntries(response.data));
  }, []);

  const entryCards = entries.map((entry) => (
    <Card variant="outlined">
      {entry.plant}
      <p>Watered: {entry.watered_on}</p>
    </Card>
  ));
  return (
    <Paper sx={{ height: "40%" }}>
      <Typography gutterBottom variant="h4" component="div">
        History
      </Typography>
      <Paper variant="outlined" className="history-list" style={{ overflowY: "auto", height: "100%" }}>
        {entryCards}
      </Paper>
      {entries.length == 0 && (
        <Card>
          Sorry, this plant has no history. Try adding some watering entries
        </Card>
      )}
    </Paper>
  );
};
export default HistoryWidget;
