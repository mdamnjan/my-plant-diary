import { Divider, Box, Typography } from "@mui/material";

import { useState } from "react";

import AddButton from "../common/AddButton";

import "./Note.css";
import Note from "./Note";
import NoteForm from "./NoteForm";

import { fetchNotes, createNote, deleteNote } from "../../api";
import { uploadFileToFirebase } from "../../utils";

import { useQuery, useQueryClient } from "react-query";

const NotesPage = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: noteList,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`notes`],
    queryFn: () => fetchNotes(),
    initialData: [],
  });

  const handleDelete = (note) => {
    deleteNote(note).then(() => queryClient.invalidateQueries(["notes"]));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setOpen(true);
  };

  let notes = noteList.map((note) => (
    <Box sx={{ width: "100%" }}>
      <Note
        key={note.id}
        note={note}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </Box>
  ));

  const handleSubmit = (e, text, plant, img) => {
    const updatePage = () => {
      setOpen(false);
      queryClient.invalidateQueries(["notes"]);
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

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h2">Notes</Typography>
      </Box>
      <Divider />
      <div style={{ margin: "20px auto" }}>{notes}</div>
      <AddButton onClick={() => setOpen(true)} tooltipText={"Add a note"} />
      <NoteForm
        handleSubmit={handleSubmit}
        open={open}
        isEditing={isEditing}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
export default NotesPage;
