import "./common.css";

import { Paper, Button, Typography } from "@mui/material";
import {
  Home,
  LocalFlorist,
  LocalDrink,
  AccountCircle,
  Note,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { logout } from "../Plants/utils";
import { useNavigate } from "react-router-dom";
import { useDebugValue } from "react";

const SideBar = ({ onClick }) => {
  const buttons = [
    { text: "Home", icon: <Home fontSize="large" />, url: "/" },
    {
      text: "My Plants",
      icon: <LocalFlorist fontSize="large" />,
      url: "/plants",
    },
    {
      text: "Watering",
      icon: <LocalDrink fontSize="large" />,
      url: "/watering",
    },
    { text: "Notes", icon: <Note fontSize="large" />, url: "/notes" },
    {
      text: "Profile",
      icon: <AccountCircle fontSize="large" />,
      url: "/profile",
    },
  ];

  let navigate = useNavigate();
  return (
    <Paper className="side-bar">
      <Typography>
        <img id="logo" src="leaf-svgrepo-com.svg" />
        <h2>My Plant Diary</h2>
      </Typography>
      <nav>
        {buttons.map((button) => (
          <Button component={Link} to={button.url}>
            {button.icon}
            <h2>{button.text}</h2>
          </Button>
        ))}
      </nav>
      <Button
        id="side-bar-add-button"
        variant="outlined"
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Logout
      </Button>
    </Paper>
  );
};
export default SideBar;
