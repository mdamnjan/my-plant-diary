import { Card, Paper, Typography } from "@mui/material";

import "./Plants.css";

const HistoryWidget = ({ entries, type }) => {
  const entryCards = entries.map((entry) => (
    <Card variant="outlined">
      {type === "watering" && <p>Watered: {entry.watered_on}</p>}
      {type === "note" && <p>{entry.text}</p>}
    </Card>
  ));
  return (
    <Paper sx={{ height: "40%", width: "50%", display: "inline-block" }}>
      <Typography gutterBottom variant="h4" component="div">
        {type === "watering" ? "Waterings" : "Notes"}
      </Typography>
      <Paper
        variant="outlined"
        className="history-list"
        style={{ overflowY: "auto", height: "100%" }}
      >
        {entryCards}
      </Paper>
      {entries.length === 0 && (
        <Card>
          Sorry, this plant has no entries. Try adding some watering entries or notes.
        </Card>
      )}
    </Paper>
  );
};
export default HistoryWidget;
