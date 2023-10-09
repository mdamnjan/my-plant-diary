import { Delete, Edit, CheckCircle, CircleOutlined } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
} from "@mui/material";

import "../Notes/Note.css";

const Task = ({ task }) => {
  const getTagColor = (type) => {
    switch (type) {
      case "Water":
        return "#4444ff";
      case "Repot":
        return "#a03f0b";
      case "Propagate":
        return "#7ca118";
      default:
        return "#ff7d20";
    }
  };

  return (
    <>
      <Card
        sx={{
          marginBottom: "20px",
          minWidth: "260px",
          display: "flex",
          justifyContent: "space-between",
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
        <CardContent sx={{ display: "flex" }}>
          <div>
            <Avatar src="../../Calathea_orbifolia.jpg" />
          </div>
          <div>
            <h3 style={{ margin: "5px 0px 0px 10px" }}>
              {task.plant.name || "plant name"}
            </h3>
          </div>
          <Chip
            sx={{
              backgroundColor: getTagColor(task.type),
              color: "white",
              margin: "3px 0px 0px 5px",
            }}
            label={task.type}
          />
        </CardContent>
        <CardActions>
          <IconButton
            sx={{ padding: "0px" }}
            color={task.completed ? "success" : "default"}
          >
            {task.completed ? <CheckCircle /> : <CircleOutlined />}
          </IconButton>
          <IconButton color="primary" sx={{ padding: "0px" }}>
            <Edit />
          </IconButton>
          <IconButton color="default" sx={{ padding: "0px" }}>
            <Delete />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};
export default Task;
