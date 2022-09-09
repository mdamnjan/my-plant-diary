import HistoryWidget from "./HistoryWidget";

import { Paper } from "@mui/material";

const SideBar = () => {
  return (
    <Paper className="side-bar">
      <h1>Home</h1>
      <h1>My Plants</h1>
      <h1>Watering Entries</h1>
      <h1>Profile</h1>
      <HistoryWidget />
    </Paper>
  );
};
export default SideBar;
