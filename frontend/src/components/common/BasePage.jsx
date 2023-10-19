import { Container, Paper, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";

import "./common.css";
import NavBar from "./NavBar";
import Aside from "./Aside";

const BasePage = () => {
  const smallScreen = !useMediaQuery(`(min-width:650px)`);

  return (
    <Container
      disableGutters
      maxWidth={"none"}
      id="base-page"
      style={{ display: "flex", height: "100vh", width: "100vw", flexDirection: smallScreen? "column": "row" }}
      sx={{ height: "100vh" }}
      component={Paper}
    >
      <NavBar smallScreen={smallScreen} />
      <Container
        disableGutters
        maxWidth={false}
        style={{
          margin: "auto",
          padding: "20px",
          height: "100vh",
          width: "100%",
          overflowY: "auto",
        }}
        sx={{ position: "relative !important", height: "100vh" }}
      >
        <Outlet />
      </Container>
    </Container>
  );
};
export default BasePage;
