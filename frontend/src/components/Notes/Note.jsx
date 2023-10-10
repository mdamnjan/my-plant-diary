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

const Note = ({ note }) => {
  return (
    <>
      <Card
        sx={{
          marginBottom: "20px",
          minWidth: "260px",
          position: "relative",
          top: "1px",
          right: "6px",
        }}
      >
        <CardActions style={{ float: "right" }}>
          <IconButton size="small" color="primary">
            <Edit />
          </IconButton>
          <IconButton size="small" color="default">
            <Delete />
          </IconButton>
        </CardActions>
        <CardContent sx={{ display: "flex" }}>
          <div>
            <Avatar src="../../Calathea_orbifolia.jpg" />
          </div>
          <div>
            <h3 style={{ margin: "5px 0px 0px 10px" }}>
              {note.plant.name || "plant name"}
            </h3>
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
      </Card>
    </>
  );
};
export default Note;
