import { Container, Paper, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";

import "./common.css";
import NavBar from "./NavBar";

const BasePage = () => {
  const smallScreen = !useMediaQuery(`(min-width:650px)`);

  return (
    <Container
      disableGutters
      maxWidth={"none"}
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: smallScreen ? "column" : "row",
      }}
    >
      <NavBar smallScreen={smallScreen} />
      <Container
        disableGutters
        maxWidth={"xl"}
        sx={{
          padding: "20px",
          height: "100vh",
          width: "100%",
          overflowY: "auto",
          position: "relative !important",
        }}
      >
        <Outlet />
      </Container>
    </Container>
  );
};
export default BasePage;
