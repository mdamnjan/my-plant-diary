import { Box, Typography, styled } from "@mui/material";

const StyledImage = styled("img")(() => ({
  width: "40px",
  height: "40px",
  borderRadius: "10px",
  marginRight: "7px",
  backgroundColor: "white",
  padding: "10px",
  display: "inline",
  verticalAlign: "middle",
}));

const AppTitle = styled(Typography)(() => ({
  fontWeight: "bold",
  display: "inline",
  verticalAlign: "middle",
}));

const Logo = () => {
  return (
    <Box sx={{ padding: "20px 0px 20px 0px" }}>
      <StyledImage id="logo" alt="plant logo" src="plant-logo.png" />
      <AppTitle variant="h3">My Plant Diary</AppTitle>
    </Box>
  );
};
export default Logo;
