import { Button, Paper, Typography, IconButton, styled } from "@mui/material";
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

import "./common.css";
import Logo from "./Logo";

const StyledNav = styled("nav")(({ smallScreen }) => ({
  display: "flex",
  flexDirection: smallScreen ? "row" : "column",
  ...(smallScreen && {
    margin: "0px",
    justifyContent: "space-around",
    padding: "5px",
  }),
  ...(!smallScreen && { alignItems: "flex-start" }),
}));

const StyledNavContainer = styled(Paper)(({ smallScreen }) => ({
  backgroundColor: "rgba(71, 161, 92, 0.389)",
  ...(!smallScreen && { height: "100vh", minWidth: "250px", padding: "20px" }),
}));

const StyledButton = styled(Button)(() => ({
  marginBottom: "2px",
  textTransform: "none",
  borderRadius: "20px",
  display: "flex",
  justifyContent: "flex-start",
  padding: "2px 20px",
}));

const StyledIconButton = styled(IconButton)(() => ({
  textTransform: "none",
  borderRadius: "20px",
  display: "flex",
}));

const NavBar = ({ smallScreen }) => {
  const buttons = [
    {
      key: "home-button",
      text: "Home",
      icon: <Home />,
      url: "/",
      onClick: function () {
        navigate("/");
      },
    },
    {
      key: "plants-button",
      text: "Plants",
      icon: <LocalFlorist />,
      url: "/plants",
      onClick: function () {
        navigate("/plants");
      },
    },
    {
      key: "tasks-button",
      text: "Tasks",
      icon: <Task />,
      url: "/tasks",
      onClick: function () {
        navigate("/tasks");
      },
    },
    {
      key: "notes-button",
      text: "Notes",
      icon: <Note />,
      url: "/notes",
      onClick: function () {
        navigate("/notes");
      },
    },
    {
      key: "profile-button",
      text: "Profile",
      icon: <AccountCircle />,
      url: "/profile",
      onClick: function () {
        navigate("/profile");
      },
    },
    {
      key: "logout-button",
      text: "Log Out",
      icon: <Logout />,
      onClick: function () {
        logout();
        navigate("/login");
      },
    },
  ];

  let navigate = useNavigate();

  if (smallScreen) {
    return (
      <StyledNavContainer smallScreen>
        <StyledNav smallScreen>
          {buttons.map((button) => (
            <StyledIconButton
              key={button.key}
              color={
                window.location.pathname === button.url ? "primary" : "default"
              }
              onClick={button.onClick}
            >
              {button.icon}
            </StyledIconButton>
          ))}
        </StyledNav>
      </StyledNavContainer>
    );
  }

  return (
    <StyledNavContainer>
      <Logo />
      <StyledNav>
        {buttons.map((button) => (
          <StyledButton
            key={button.key}
            disableElevation
            fullWidth
            variant={window.location.pathname === button.url ? "contained" : ""}
            onClick={button.onClick}
            startIcon={button.icon}
          >
            <Typography
              variant="h4"
              sx={{ margin: "10px 10px 10px 0px", fontWeight: "bold" }}
            >
              {button.text}
            </Typography>
          </StyledButton>
        ))}
      </StyledNav>
    </StyledNavContainer>
  );
};
export default NavBar;
