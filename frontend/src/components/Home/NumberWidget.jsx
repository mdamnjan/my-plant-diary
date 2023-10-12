import { Paper, IconButton, Typography } from "@mui/material";

const NumberWidget = ({ icon, data, subtitle, iconColor, backgroundColor }) => {
  return (
    <Paper
      style={{
        flex: "1 1 0",
        height: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "column",
        padding: "40px",
        backgroundColor: backgroundColor,
      }}
    >
      <IconButton
        disableRipple
        disableTouchRipple
        sx={{ color: "white", backgroundColor: iconColor }}
        color="primary"
      >
        {icon}
      </IconButton>
      <Typography variant="h5">{data}</Typography>
      <span>{subtitle}</span>
    </Paper>
  );
};
export default NumberWidget;
