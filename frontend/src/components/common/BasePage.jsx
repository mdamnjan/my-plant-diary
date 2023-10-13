import { Container, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";

import "./common.css";
import NavBar from "./NavBar";
import Aside from "./Aside";

const BasePage = () => {
  return (
    <Container
      disableGutters
      maxWidth={'xl'}
      id="base-page"
      style={{ display: "flex", height: '100vh', width: '100vw' }}
      sx={{height: "100vh"}}
      component={Paper}
    >
      <NavBar />
      <Container
        maxWidth={false}
        style={{
          margin: "auto",
          padding: "20px 40px 20px 40px",
          height: "100vh",
          width: "100%",
          overflowY: "auto",
        }}
        sx={{ position: "relative !important", height: "100vh" }}
      >
        <Outlet />
      </Container>
      <Aside />
    </Container>
  );
};
export default BasePage;
