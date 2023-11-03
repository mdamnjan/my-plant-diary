import {
  Autocomplete,
  TextField,
  Box,
  Avatar,
  Chip,
} from "@mui/material";
import { useState, useEffect } from "react";
import { fetchPlants } from "../../api";
import UploadButton from "../common/UploadButton";
import { getImageFromFile } from "../../utils";
import BaseForm from "./BaseForm";
import "../Notes/Note.css"

const NoteForm = ({ open, onClose, handleSubmit }) => {
  const [plant, setPlant] = useState(null);
  const [noteContent, setNoteContent] = useState(null);
  const [plantList, setPlantList] = useState([]);
  const [img, setImg] = useState(null);

  useEffect(() => {
    const getPlants = async () => {
      fetchPlants().then((res) => setPlantList(res.data));
    };
    getPlants();
  }, []);

  return (
    <BaseForm
      title={"Add a Note"}
      buttonText={"Create note"}
      open={open}
      onClose={onClose}
      handleSubmit={handleSubmit}
    >
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
      <img
        style={{
          height: "200px",
          objectFit: "contain",
          backgroundColor: "#b5b5b5",
          width: "100%",
        }}
        alt="uploaded"
        src={getImageFromFile(img) || ""}
      ></img>
      <UploadButton setFile={setImg} />
      <TextField
        sx={{ marginBottom: "20px" }}
        onChange={(e) => setNoteContent(e.target.value)}
        fullWidth
        multiline
        rows={4}
        placeholder="Write a note..."
      />
    </BaseForm>
  );
};
export default NoteForm;
