import TaskList from "../../../Tasks/TaskList";

import BaseWidget from "../../../common/BaseWidget";

const TasksTab = ({ plant }) => {
  return (
    <>
      <BaseWidget sx={{ marginTop: "20px" }} title="Today">
        <TaskList plant={plant} interval="today"></TaskList>
      </BaseWidget>
      <BaseWidget sx={{ marginTop: "20px" }} title="Next 7 days">
        <TaskList plant={plant} interval="week"></TaskList>
      </BaseWidget>
      <BaseWidget sx={{ marginTop: "20px" }} title="Next 2 weeks">
        <TaskList plant={plant} interval="2weeks"></TaskList>
      </BaseWidget>
      <BaseWidget sx={{ marginTop: "20px" }} title="Next month">
        <TaskList plant={plant} interval="month"></TaskList>
      </BaseWidget>
    </>
  );
};
export default TasksTab;
