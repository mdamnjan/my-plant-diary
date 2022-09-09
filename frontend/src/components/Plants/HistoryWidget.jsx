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
      <Typography gutterBottom variant="h4" component="div">
        History
      </Typography>
      {entryCards}
    </Paper>
  );
};
export default HistoryWidget;
