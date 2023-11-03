import { LinearProgress } from "@mui/material";

const TaskProgressBar = ({ resource }) => {
  let progressPercentage =
    resource.task_count !== 0
      ? (100 * resource.completed_task_count) / resource.task_count
      : 100;

  return (
    <div>
      <LinearProgress
        sx={{ borderRadius: "50px" }}
        value={progressPercentage}
        variant="determinate"
      />
      <span>{`${Math.floor(progressPercentage)}%`} tasks completed</span>
    </div>
  );
};
export default TaskProgressBar;
