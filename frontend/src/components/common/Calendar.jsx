import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers";
import { Badge } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

function ServerDay(props) {
  const { highlightedDays=[], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "🔵" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

const Calendar = () => {
  const [highlightedDays, setHighlightedDays] = useState([29]);

  const fetchTasks = () => {
    console.log("fetching tasks...")
  }

  useEffect(()=>{
    fetchTasks()
  }, [])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        slots={{ day: ServerDay }}
        slotProps={{
          day: {
            highlightedDays,
          },
        }}
        // defaultValue={dayjs(new Date())}
      />
    </LocalizationProvider>
  );
};
export default Calendar;
