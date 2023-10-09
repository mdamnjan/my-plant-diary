import { Divider, Box, Typography } from "@mui/material";

import { useState, useEffect } from "react";

import AddButton from "../common/AddButton";

import "./Note.css";
import Note from "./Note";
import NoteForm from "./NoteForm";

import { fetchNotes, createNote } from "../Plants/utils";

const NotesPage = () => {
  const [open, setOpen] = useState(false);
  const [noteList, setNoteList] = useState([]);

  let notes = noteList.map((note) => (
    <Box sx={{ width: "100%" }}>
      <Note key={note.id} note={note} />
    </Box>
  ));

  const getNotes = () => {
    fetchNotes().then((response) => setNoteList(response.data));
  };

  const handleSubmit = (e, text, plant) => {
    const updatePage = () => {
      setOpen(false);
      getNotes();
    };

    const body = { text: text, plant: plant.id };
    createNote(body).then(() => updatePage());
  };

  useEffect(() => {
    getNotes();
  }, []);

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
        onClose={() => setOpen(false)}
      />
    </>
  );
};
export default NotesPage;
