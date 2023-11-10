import { TextField } from "@mui/material";
import { useState } from "react";
import UploadButton from "../common/UploadButton";
import { getImageFromFile } from "../../utils";
import BaseForm from "./BaseForm";
import "../Notes/Note.css";

import PlantSelectField from "./PlantSelectField";

const NoteForm = ({ open, onClose, handleSubmit }) => {
  const [plant, setPlant] = useState(null);
  const [noteContent, setNoteContent] = useState(null);
  const [img, setImg] = useState(null);

  const clearForm = () => {
    setPlant(null);
    setImg(null);
    setNoteContent(null);
  };

  return (
    <BaseForm
      title={"Add a Note"}
      buttonText={"Create note"}
      open={open}
      onClose={() => {
        clearForm();
        onClose();
      }}
      handleSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e, noteContent, plant, img);
      }}
    >
      <PlantSelectField plant={plant} setPlant={setPlant} />
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
