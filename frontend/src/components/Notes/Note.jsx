import "./Note.css";

const Note = ({ note }) => {
  return (
    <div className="note-container">
      <div className="user-profile">
        <img href="" />
        <p className="username">{note.owner.username}</p>
      </div>
      <p>Plant: {note.plant.name}</p>
      <p>{note.text}</p>
    </div>
  );
};
export default Note;
