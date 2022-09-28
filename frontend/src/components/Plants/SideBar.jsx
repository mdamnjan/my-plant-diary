import HistoryWidget from "./HistoryWidget";

import { Paper, Button } from "@mui/material";
import { Home, Yard, LocalDrink, AccountCircle } from "@mui/icons-material";
const SideBar = ({ navigation, onClick }) => {
  const buttons = [
    { text: "Home", icon: <Home /> },
    { text: "My Plants", icon: <Yard /> },
    { text: "Watering Entries", icon: <LocalDrink /> },
    { text: "Profile", icon: <AccountCircle /> },
  ];
  if (navigation) {
    return (
      <Paper className="side-bar">
        {buttons.map((button) => (
          <Button style={{display: "flex"}}>
            {button.icon}
            <h2>{button.text}</h2>
          </Button>
        ))}
        <Button onClick={onClick} style={{width: "100%"}} variant="contained">Add a Plant</Button>
      </Paper>
    );
  } else {
    return (
      <Paper className="side-bar">
        <HistoryWidget />
      </Paper>
    );
  }
};
export default SideBar;
