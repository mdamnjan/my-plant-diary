import { Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";

import "./Note.css";
import NoteForm from "../Forms/NoteForm";
import ConfirmForm from "../Forms/ConfirmForm";

import { useState } from "react";

const Note = ({ note, handleDelete, handleEdit }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Card
        sx={{
          marginBottom: "20px",
          minWidth: "260px",
          position: "relative",
          top: "1px",
          right: "6px",
          borderRadius: "20px",
        }}
      >
        <CardActions style={{ float: "right" }}>
          <IconButton size="small" color="primary" onClick={() => setIsEditing(true)}>
            <Edit />
          </IconButton>
          <IconButton
            size="small"
            color="default"
            onClick={() => setConfirmDelete(true)}
          >
            <Delete />
          </IconButton>
        </CardActions>
        <CardContent sx={{ display: "flex" }}>
          <div>
            <Avatar src={note.plant_img || "../../Calathea_orbifolia.jpg"} />
          </div>
          <div>
            <h3 style={{ margin: "5px 0px 0px 10px" }}>{note.plant_name}</h3>
            <p style={{ margin: "5px 0px 0px 10px" }}>{note.text}</p>
          </div>
        </CardContent>
        {note.img_url && (
          <CardMedia
            sx={{
              objectFit: "contain",
              backgroundColor: "#b5b5b5",
              width: "100%",
              maxHeight: 400,
              marginBottom: "40px",
            }}
            component="img"
            src={note.img_url}
          />
        )}
        <span style={{ float: "right", margin: "0px 20px 20px 20px" }}>
          {new Date(note.created).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </Card>
      <NoteForm
        open={isEditing}
        isEditing={isEditing}
        onClose={() => setIsEditing(false)}
        handleSubmit={handleEdit}
        note={note}
      ></NoteForm>
      <ConfirmForm
        title="Delete note?"
        buttonText="Delete"
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        handleSubmit={() => handleDelete(note.id)}
      ></ConfirmForm>
    </>
  );
};
export default Note;
