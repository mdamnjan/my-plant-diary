import { Card, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import "./Plants.css";
import { fetchNotes, fetchWateringEntries } from "./utils";

const HistoryWidget = ({ type }) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (type == "watering") {
      fetchWateringEntries().then((response) => setEntries(response.data));
    } else {
      fetchNotes().then((response) => setEntries(response.data));
    }
  }, []);

  const entryCards = entries.map((entry) => (
    <Card variant="outlined">
      {type == "watering" && <p>Watered: {entry.watered_on}</p>}
      {type == "note" && <p>{entry.text}</p>}
    </Card>
  ));
  return (
    <Paper sx={{ height: "40%", width: "50%", display: "inline-block" }}>
      <Typography gutterBottom variant="h4" component="div">
        {type == "watering" ? "Waterings" : "Notes"}
      </Typography>
      <Paper
        variant="outlined"
        className="history-list"
        style={{ overflowY: "auto", height: "100%" }}
      >
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
