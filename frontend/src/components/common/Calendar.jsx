import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers";
import { Badge } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { fetchTasks } from "../../api";
import { useQuery } from "react-query";

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      color="primary"
      badgeContent={isSelected ? " " : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

const Calendar = (props) => {
  const highlightedDays = props.highlightedDays.map((d) => dayjs(d).date());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        slots={{ day: ServerDay }}
        onMonthChange={props.handleMonthChange}
        slotProps={{
          day: { highlightedDays },
        }}
        onChange={props.handleDateSelect}        
      />
    </LocalizationProvider>
  );
};
export default Calendar;
