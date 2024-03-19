import { Box, Typography, styled } from "@mui/material";

const StyledImage = styled("img")(({ width, height }) => ({
  width: width,
  height: height,
  display: "inline",
  verticalAlign: "middle",
  marginRight: "10px"
}));

const AppTitle = styled(Typography)(() => ({
  fontWeight: "bold",
  display: "inline",
  verticalAlign: "middle",
}));

const Logo = ({ width="65px", height="65px"}) => {
  return (
    <Box
      sx={{
        padding: "20px 0px 20px 0px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <StyledImage
        id="logo"
        alt="plant logo"
        src="logo.png"
        width={width}
        height={height}
      />
      <AppTitle variant="h3">My Plant Diary</AppTitle>
    </Box>
  );
};
export default Logo;
