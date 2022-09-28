import HistoryWidget from "./HistoryWidget";

import { Paper, Button, Typography } from "@mui/material";
import { Home, LocalFlorist, LocalDrink, AccountCircle } from "@mui/icons-material";

const SideBar = ({ navigation, onClick }) => {
  const buttons = [
    { text: "Home", icon: <Home fontSize="large"/> },
    { text: "My Plants", icon: <LocalFlorist fontSize="large"/> },
    { text: "Watering", icon: <LocalDrink fontSize="large"/> },
    { text: "Profile", icon: <AccountCircle fontSize="large"/> },
  ];
  if (navigation) {
    return (
      <Paper className="side-bar">
        <Typography style={{display: "flex"}} >
        <img style={{width: "30px", margin: "10px"}} src="leaf-svgrepo-com.svg"/>
        <h2>My Plant Diary</h2></Typography>
        {buttons.map((button) => (
          <Button style={{display: "flex"}}>
            {button.icon}
            <h2 style={{marginLeft: "5px"}} >{button.text}</h2>
          </Button>
        ))}
        <Button onClick={onClick} style={{width: "100%", marginTop: "5%"}} variant="contained">Add a Plant</Button>
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
