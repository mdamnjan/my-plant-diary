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
        {/* <CardHeader
        avatar={<Avatar src="../../Calathea_orbifolia.jpg" />}
        title={note.plant.name || "plant name"}
        // action={
        //   <CardActions>
        //     <Fab color="primary" size="small">
        //       <Edit />
        //     </Fab>
        //     <Fab size="small">
        //       <Delete color="action" />
        //     </Fab>
        //   </CardActions>
        // }
      /> */}
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
        {note.img && (
          <CardMedia
            sx={{ objectFit: "contain", maxHeight: 400 }}
            component="img"
            src="../../Calathea_orbifolia.jpg"
          />
        )}
      </Card>
    </>
  );
};
export default Note;
