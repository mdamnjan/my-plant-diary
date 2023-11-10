import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useState } from "react";

import BaseForm from "./BaseForm";
import PlantSelectField from "./PlantSelectField";

const TaskForm = ({ open, onClose, handleSubmit, isEditing, task }) => {
  const [plant, setPlant] = useState(null);
  const [taskType, setTaskType] = useState(null);
  const [taskDate, setTaskDate] = useState(null);

  const clearForm = () => {
    setPlant(null);
    setTaskType(null);
    setTaskDate(null);
  };

  return (
    <BaseForm
      title={isEditing ? "Edit Task" : "Add a Task"}
      buttonText={isEditing ? "Update task" : "Create task"}
      open={open}
      onClose={() => {
        clearForm();
        onClose();
      }}
      handleSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e, taskType, plant, taskDate);
      }}
    >
      <PlantSelectField plant={plant} setPlant={setPlant} />
      <FormControl fullWidth sx={{ margin: "10px 0px 20px 0px" }}>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Type"
          defaultValue={"water"}
          onChange={(e) => setTaskType(e.target.value)}
        >
          <MenuItem value={"water"}>Water</MenuItem>
          <MenuItem value={"progress"}>Progress Update</MenuItem>
          <MenuItem value={"repot"}>Repot</MenuItem>
          <MenuItem value={"prune"}>Prune</MenuItem>
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{ width: "100%" }}
          className="date-picker"
          label="Date"
          onChange={(newValue) => {
            const newDate = new Date(newValue).toLocaleDateString("en-CA");
            setTaskDate(newDate);
          }}
          renderInput={(params) => (
            <TextField InputLabelProps={{ shrink: true }} {...params} />
          )}
        />
      </LocalizationProvider>
    </BaseForm>
  );
};
export default TaskForm;
