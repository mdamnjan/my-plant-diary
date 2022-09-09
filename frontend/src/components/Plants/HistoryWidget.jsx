import { Card, Typography } from "@mui/material";

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
    <>
      <Typography gutterBottom variant="h4" component="div">
        History
      </Typography>
      {entryCards}
      {entries.length==0 && (
        <Card>
          Sorry, this plant has no history. Try adding some watering entries
        </Card>
      )}
    </>
  );
};
export default HistoryWidget;
