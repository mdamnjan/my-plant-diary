import { Paper, Card } from "@mui/material";

import "./Plants.css"
import Actions from "./Actions";

const HistoryWidget = ({ entries }) => {
  const entryCards = entries.map((entry) => (
    <Card variant="outlined">
      <Actions/>
      {entry.plant.name}
      <p>Watered: {entry.watered_on}</p>
    </Card>
  ));
  return <Paper className="history-widget"><h1>History</h1>{entryCards}</Paper>;
};
export default HistoryWidget;
