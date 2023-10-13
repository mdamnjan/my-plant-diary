import Dialog from "@mui/material/Dialog";
import {
  Button,
  Autocomplete,
  TextField,
  Box,
  Avatar,
  Typography,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { fetchPlants } from "../../api";
import UploadButton from "../common/UploadButton";
import { getImageFromFile } from "../../utils";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const TaskForm = ({ open, onClose, handleSubmit, isEditing, task }) => {
  const [plant, setPlant] = useState(null);
  const [taskType, setTaskType] = useState(null);
  const [plantList, setPlantList] = useState([]);
  const [taskDate, setTaskDate] = useState(null);

  useEffect(() => {
    const getPlants = async () => {
      fetchPlants().then((res) => setPlantList(res.data));
    };
    getPlants();
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e, taskType, plant, taskDate);
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: "20px",
          padding: "20px",
          minWidth: "300px",
        }}
      >
        <Typography>{isEditing? "Edit Task": "Add a Task"}</Typography>
        <Autocomplete
          fullWidth
          style={{
            margin: "10px 0px",
            alignSelf: "flex-start",
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option.name}
                size="small"
                {...getTagProps({ index })}
              />
            ))
          }
          getOptionLabel={(option) => option.name}
          options={plantList}
          renderInput={(params) => (
            <TextField {...params} placeholder="Search for a plant..." />
          )}
          renderOption={(props, option) => (
            <Box
              {...props}
              style={{
                alignSelf: "flex-start",
                // backgroundColor: "rgb(225 223 223)",
                borderRadius: "60px",
                padding: "10px",
                display: "inline-block",
                marginBottom: "10px",
                width: "100%",
              }}
            >
              <Avatar
                sx={{
                  marginRight: "10px",
                  display: "inline-block",
                  verticalAlign: "middle",
                }}
                src={option.img_url || "../../Calathea_orbifolia.jpg"}
              />
              <p style={{ display: "inline-block" }} className="username">
                {option.name}
              </p>
            </Box>
          )}
          onChange={(e, newValue) => {
            setPlant(newValue);
          }}
        />{" "}
        {plant && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: "30px",
              backgroundColor: "rgb(225 223 223)",
              margin: "10px 0px",
              padding: "5px 10px 5px 5px",
              position: "relative",
              justifyContent: "space-between",
              alignSelf: "flex-start",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={plant.img_url || "../../Calathea_orbifolia.jpg"}
                alt="plant"
                style={{
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  marginRight: "5px",
                }}
              ></img>
              {plant.name}
            </div>
          </div>
        )}
        <FormControl fullWidth sx={{margin: "10px 0px 20px 0px" }}>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Type"
            value={taskType}
            onChange={(e)=>setTaskType(e.target.value)}
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
        <Button
          style={{ alignSelf: "flex-end"}}
          variant="contained"
          type="submit"
        >
          Create task
        </Button>
      </form>
    </Dialog>
  );
};
export default TaskForm;
