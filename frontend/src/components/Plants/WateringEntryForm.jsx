import { Button, Dialog, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { useState, useEffect } from "react";

const WateringEntryForm = ({ open, onClose, plant, handleSubmit }) => {
  const [date, setDate] = useState(null);

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
            watered_on: date,
          });
        }}
        className="new-plant-form-container"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="date-picker"
            label="Date"
            onChange={(newValue) => {
              const newDate = new Date(newValue).toLocaleDateString("en-CA");
              setDate(newDate);
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
