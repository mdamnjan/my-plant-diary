import { Chip, styled } from "@mui/material";

const getTaskTagColor = (type) => {
  switch (type) {
    case "Late":
      return "red";
    case "Water":
      return "#4444ff";
    case "Repot":
      return "#a03f0b";
    case "Prune":
      return "#7ca118";
    default:
      return "#ff7d20";
  }
};

const TaskTag = styled(Chip)(({ type }) => ({
  backgroundColor: getTaskTagColor(type),
  color: "white",
  margin: "3px 0px 0px 0px",
}));

export default TaskTag;
