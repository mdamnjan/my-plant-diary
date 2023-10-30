import Note from "../../../Notes/Note";
import BaseWidget from "../../../common/BaseWidget";
import { Box, Typography } from "@mui/material";
import { Task as TaskIcon } from "@mui/icons-material";

const NotesTab = ({ notes }) => {
  if (notes.length === 0) {
    return (
      <BaseWidget sx={{marginTop: "20px"}}>
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
    );
  }
  return notes.map((note) => <Note note={note} />);
};
export default NotesTab;
