import { Button, Container, Paper, Typography } from "@mui/material";
import {
  AccountCircle,
  Analytics,
  Home,
  LocalFlorist,
  Logout,
  Note,
  Task,
} from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";

import "./common.css";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { logout } from "../Plants/utils";

const BasePage = () => {
  const buttons = [
    { text: "Home", icon: <Home fontSize="large" />, url: "/" },
    {
      text: "Insights",
      icon: <Analytics fontSize="large" />,
      url: "/insights",
    },
    {
      text: "Plants",
      icon: <LocalFlorist fontSize="large" />,
      url: "/plants",
    },
    {
      text: "Tasks",
      icon: <Task fontSize="large" />,
      url: "/tasks",
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
    <Container
      disableGutters
      maxWidth={"xl"}
      id="base-page"
      style={{ display: "flex" }}
      component={Paper}
    >
      <Paper className="nav-bar">
        <Typography sx={{ padding: "10px 20px" }}>
          <img id="logo" alt="plant logo" src="leaf-svgrepo-com.svg" />
          <h3>My Plant Diary</h3>
        </Typography>
        <nav style={{ padding: "0px 20px" }}>
          {buttons.map((button) => (
            <Button
              fullWidth
              variant={
                window.location.pathname === button.url ? "contained" : ""
              }
              sx={{
                textTransform: "none",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "flex-start",
                padding: "5px 20px",
              }}
              component={Link}
              to={button.url}
            >
              {button.icon}
              <h3 className="nav-text" style={{ marginLeft: "10px" }}>
                {button.text}
              </h3>
            </Button>
          ))}
          <Button
            fullWidth
            sx={{
              textTransform: "none",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "flex-start",
              padding: "5px 20px",
              justifySelf: "flex-end",
              alignSelf: "end",
            }}
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <Logout />
            <h3 className="nav-text" style={{ marginLeft: "10px" }}>
              Log Out
            </h3>
          </Button>
        </nav>
      </Paper>
      <Container
        maxWidth={false}
        style={{
          margin: "auto",
          padding: "20px 40px 20px 40px",
          height: "100vh",
          width: "100%",
          overflowY: "auto",
        }}
      >
        <Outlet />
      </Container>
      <Paper className="side-bar">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar />
        </LocalizationProvider>
      </Paper>
    </Container>
  );
};
export default BasePage;
