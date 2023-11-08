import Note from "../../../Notes/Note";
import BaseWidget from "../../../common/BaseWidget";
import { Box, Typography } from "@mui/material";
import { Task as TaskIcon } from "@mui/icons-material";
import AddButton from "../../../common/AddButton";
import NoteForm from "../../../Forms/NoteForm";

import { useState } from "react";
import { createNote } from "../../../../api";

import { uploadFileToFirebase } from "../../../../utils";

const NotesTab = ({ notes }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e, text, plant, img) => {
    const updatePage = () => {
      setOpen(false);
    };

    let body = { text: text, plant: plant.id };

    if (img) {
      uploadFileToFirebase(img).then((url) => {
        createNote({ img_url: url, ...body }).then(() => updatePage());
      });
    } else {
      createNote(body).then(() => updatePage());
    }
  };

  if (notes.length === 0) {
    return (
      <>
        <BaseWidget sx={{ marginTop: "20px" }}>
          <Box
            sx={{
              width: "100%",
              minHeight: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="empty-state"
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <TaskIcon sx={{ fill: "grey", height: "35px", width: "55px" }} />
              <Typography>No notes</Typography>
            </div>
          </Box>
        </BaseWidget>
        <AddButton tooltipText={"Add a note"} onClick={()=>setOpen(true)}/>
        <NoteForm
          open={open}
          onClose={() => setOpen(false)}
          handleSubmit={(note) => {
            setOpen(false);
            createNote({ text: note.text, plant: note.plant });
          }}
        />
      </>
    );
  }
  return (
    <>
      {notes.map((note) => (
        <Note note={note} />
      ))}
      <AddButton tooltipText={"Add a note"} onClick={()=>setOpen(true)} />
      <NoteForm
        open={open}
        onClose={() => setOpen(false)}
        handleSubmit={handleSubmit}
      />
    </>
  );
};
export default NotesTab;
