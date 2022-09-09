import { Paper, Card, Typography } from "@mui/material";

import "./Plants.css";
import Actions from "./Actions";

const HistoryWidget = ({ entries }) => {
  const entryCards = entries.map((entry) => (
    <Card variant="outlined">
      <Actions />
      {entry.plant}
      <p>Watered: {entry.watered_on}</p>
    </Card>
  ));
  return (
    <Paper className="history-widget">
      <h1>Home</h1>
      <h1>My Plants</h1>
      <h1>Watering Entries</h1>
      <Typography gutterBottom variant="h4" component="div">
        History
      </Typography>
      {entryCards}
    </Paper>
  );
};
export default HistoryWidget;
