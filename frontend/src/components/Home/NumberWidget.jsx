import { Paper, IconButton, Typography } from "@mui/material";
import "./HomePage.css";

const NumberWidget = ({ icon, data, subtitle, iconColor, backgroundColor }) => {
  return (
    <Paper
      className="widget"
      style={{
        flex: "1 1 0",
        height: "100px",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        padding: "40px",
        backgroundColor: backgroundColor,
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <div style={{display: "flex", alignItems: "center"}}>
        <IconButton
          disableRipple
          disableTouchRipple
          sx={{ color: "white", backgroundColor: iconColor, marginRight: "10px" }}
          color="primary"
        >
          {icon}
        </IconButton>
        <Typography variant="h5">{data}</Typography>
      </div>
      <Typography sx={{marginTop: "10px"}} variant="span">{subtitle}</Typography>
    </Paper>
  );
};
export default NumberWidget;
