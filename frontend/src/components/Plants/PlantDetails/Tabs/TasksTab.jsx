import TaskForm from "../../../Forms/TaskForm";
import TaskList from "../../../Tasks/TaskList";
import AddButton from "../../../common/AddButton";

import BaseWidget from "../../../common/BaseWidget";

import { useState } from "react";

const TasksTab = ({ plant }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <BaseWidget sx={{ marginTop: "20px" }} title="Overdue">
        <TaskList plant={plant} overdue={true}></TaskList>
      </BaseWidget>
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
      <AddButton tooltipText={"Add a task"} onClick={()=>setOpen(true)}/>
      <TaskForm open={open}/>
    </>
  );
};
export default TasksTab;
