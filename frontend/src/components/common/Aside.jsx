import { Paper, useMediaQuery } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";

const Aside = () => {
  const smallScreen = !useMediaQuery(`(min-width:1250px)`);
  console.log(smallScreen);

  if (!smallScreen) {
    return (
      <Paper className="side-bar">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar />
        </LocalizationProvider>
      </Paper>
    );
  }
};
export default Aside;
