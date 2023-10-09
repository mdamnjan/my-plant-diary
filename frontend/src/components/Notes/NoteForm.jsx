import Dialog from "@mui/material/Dialog";
import {
  Button,
  Autocomplete,
  TextField,
  Box,
  Avatar,
  Typography,
  Chip,
} from "@mui/material";
import { useState, useEffect } from "react";
import { fetchPlants } from "../Plants/utils";

const NoteForm = ({ open, onClose, handleSubmit }) => {
  const [plant, setPlant] = useState(null);
  const [noteContent, setNoteContent] = useState(null);
  const [plantList, setPlantList] = useState([]);

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
          handleSubmit(e, noteContent, plant);
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: "20px",
          padding: "20px",
          minWidth: "400px",
        }}
      >
        <Typography>Add a Note</Typography>
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
          getOptionSelected={(option, value) => option.id === value.id}
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
                src="../../Calathea_orbifolia.jpg"
              />
              <p style={{ display: "inline-block" }} className="username">
                {option.name}
              </p>
            </Box>
          )}
          onInputChange={(e, newValue) => {
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
              alignSelf: "flex-start"
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={"../../Calathea_orbifolia.jpg"}
                alt="plant"
                style={{
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  marginRight: "5px",
                }}
              ></img>
              {plant}
            </div>
          </div>
        )}
        <TextField
          onChange={(e) => setNoteContent(e.target.value)}
          fullWidth
          multiline
          rows={4}
          placeholder="Write a note..."
        />
        <Button
          style={{ alignSelf: "flex-end" }}
          variant="contained"
          type="submit"
        >
          Create note
        </Button>
      </form>
    </Dialog>
  );
};
export default NoteForm;
