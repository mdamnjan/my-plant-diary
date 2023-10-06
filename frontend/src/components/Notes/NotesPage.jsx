import axios from "axios";
import { useState, useEffect } from "react";
import Note from "./Note";
import "./Note.css"
import { Divider } from "@mui/material";
import BasePage from "../common/BasePage";

const noteList = [
  {
    id: 1,
    text: "I love this plant so much!",
    plant: { id: 1, name: "String of Hearts" },
    owner: { username: "admin", email: "admin@example.com", password: "admin" },
  },
  {
    id: 2,
    text: "Why is this plant so dramatic ;(",
    plant: { id: 1, name: "Calathea Orbifolia" },
    owner: { username: "admin", email: "admin@example.com", password: "admin" },
  },
];

const NotesPage = () => {
  // const [noteList, setNoteList] = useState([]);
  // useEffect(() => {
  //   axios.get("/api/notes/").then((response) => setNoteList(response.data));
  // }, []);
  let notes = noteList.map((note) => <><Note key={note.id} note={note} /><Divider/></>);
  return <BasePage><div className="note-list">{notes}</div></BasePage>;
};
export default NotesPage;
