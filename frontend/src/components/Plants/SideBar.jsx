import HistoryWidget from "./HistoryWidget";

import { Paper } from "@mui/material";

const SideBar = ({ entries }) => {
  return (
    <Paper className="side-bar">
      <h1>Home</h1>
      <h1>My Plants</h1>
      <h1>Watering Entries</h1>
      <HistoryWidget entries={entries} />
    </Paper>
  );
};
export default SideBar;
