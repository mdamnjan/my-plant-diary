import {
  Button,
  Paper,
  Typography,
  Link,
  useMediaQuery,
  IconButton,
  Icon,
} from "@mui/material";
import {
  AccountCircle,
  Home,
  LocalFlorist,
  Logout,
  Note,
  Task,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import { logout } from "../../api";

const NavBar = () => {
  const buttons = [
    {
      text: "Home",
      icon: <Home fontSize="large" />,
      url: "/",
      onClick: function () {
        navigate("/");
      },
    },
    {
      text: "Plants",
      icon: <LocalFlorist fontSize="large" />,
      url: "/plants",
      onClick: function () {
        navigate("/plants");
      },
    },
    {
      text: "Tasks",
      icon: <Task fontSize="large" />,
      url: "/tasks",
      onClick: function () {
        navigate("/tasks");
      },
    },
    {
      text: "Notes",
      icon: <Note fontSize="large" />,
      url: "/notes",
      onClick: function () {
        navigate("/notes");
      },
    },
    {
      text: "Profile",
      icon: <AccountCircle fontSize="large" />,
      url: "/profile",
      onClick: function () {
        navigate("/profile");
      },
    },
    {
      text: "Log Out",
      icon: <Logout fontSize="large" />,
      url: "/logout",
      onClick: function () {
        logout();
        navigate("/login");
      },
    },
  ];

  let navigate = useNavigate();
  const smallScreen = !useMediaQuery(`(min-width:750px)`);

  if (smallScreen) {
    return (
      <Paper className="nav-bar">
        <Typography sx={{ padding: "20px 10px 0px 10px" }}>
          <img id="logo" alt="plant logo" src="leaf-svgrepo-com.svg" />
        </Typography>
        <nav
          style={{
            padding: "0px",
            margin: "0px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {buttons.map((button) => (
            <IconButton
              color={
                window.location.pathname === button.url
                  ? "primary"
                  : "default"
              }
              sx={{
                textTransform: "none",
                borderRadius: "20px",
                display: "flex",
              }}
              onClick={button.onClick}
            >
              {button.icon}
            </IconButton>
          ))}
        </nav>
      </Paper>
    );
  }

  return (
    <Paper className="nav-bar">
      <Typography sx={{ padding: "10px 20px" }}>
        <img id="logo" alt="plant logo" src="leaf-svgrepo-com.svg" />
        <h3>My Plant Diary</h3>
      </Typography>
      <nav style={{ padding: "0px 20px" }}>
        {buttons.map((button) => (
          <Button
            fullWidth
            variant={window.location.pathname === button.url ? "contained" : ""}
            sx={{
              textTransform: "none",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "flex-start",
              padding: "5px 20px",
            }}
            onClick={() => {
              navigate(button.url);
            }}
          >
            {button.icon}
            <h3 className="nav-text" style={{ marginLeft: "10px" }}>
              {button.text}
            </h3>
          </Button>
        ))}
      </nav>
    </Paper>
  );
};
export default NavBar;
