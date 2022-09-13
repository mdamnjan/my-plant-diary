import Dialog from "@mui/material/Dialog";
import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const WateringEntryForm = ({ open, onClose, plant, handleSubmit }) => {
  const [date, setDate] = useState(new Date());

  const clearFields = () => {
    setDate(null);
  };

  useEffect(() => {
    clearFields();
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          clearFields();
          // https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
          handleSubmit({
            plant: plant.id,
            watered_on: date.toLocaleDateString("en-CA"),
          });
        }}
        className="new-plant-form-container"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="date-picker"
            label="Date"
            value={date}
            onChange={(newValue) => {
              setDate(new Date(newValue));
            }}
            renderInput={(params) => (
              <TextField InputLabelProps={{ shrink: true }} {...params} />
            )}
          />
        </LocalizationProvider>
        <Button
          type="submit"
          className="confirm-add-button"
          variant="contained"
        >
          {"Add Entry"}
        </Button>{" "}
      </form>
    </Dialog>
  );
};
export default WateringEntryForm;
