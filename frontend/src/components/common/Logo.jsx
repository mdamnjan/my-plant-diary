import { Box, Typography, styled } from "@mui/material";

const StyledImage = styled("img")(({ width, height }) => ({
  width: width,
  height: height,
  display: "inline",
  verticalAlign: "middle",
}));

const AppTitle = styled(Typography)(() => ({
  fontWeight: "bold",
  display: "inline",
  verticalAlign: "middle",
}));

const Logo = ({ width="80px", height="80px", marginLeft="-10px" }) => {
  return (
    <Box
      sx={{
        padding: "20px 0px 20px 0px",
        display: "flex",
        alignItems: "center",
        marginLeft: marginLeft,
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
