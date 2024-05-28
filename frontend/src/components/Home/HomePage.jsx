import { Typography, Box, Card } from "@mui/material";
import { Task as TaskIcon } from "@mui/icons-material";

import { fetchPlants, fetchUser } from "../../api";
import "./HomePage.css";
import BaseWidget from "../common/BaseWidget";
import PlantCard from "../Plants/PlantCard";
import TaskList from "../Tasks/TaskList";
import NumberWidget from "./NumberWidget";
import TaskProgressBar from "../Tasks/TaskProgressBar";
import { useQuery } from "react-query";
import { DateCalendar } from "@mui/x-date-pickers";
import Calendar from "../common/Calendar";

const HomePage = () => {
  const { data: plants, isLoading: plantsLoading } = useQuery({
    queryKey: ["plants"],
    queryFn: () => fetchPlants(),
    initialData: [],
  });
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
    initialData: {
      task_count: 0,
      completed_task_count: 0,
      overdue_task_count: 0,
    },
  });

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="h5"
          sx={{ display: "inline-block", verticalAlign: "bottom" }}
        >
          Welcome back, {user.username}!
        </Typography>
      </Box>
      <Box
        className="progress-widgets"
        sx={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "20px"
        }}
      >
        <BaseWidget
          sx={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "#c5edfa",
            gap: "20px"
          }}
        >
          <Typography>
            {user.completed_task_count}/{user.task_count}
          </Typography>
          <TaskProgressBar resource={user} />
        </BaseWidget>
        <BaseWidget title="Calendar">
          <Calendar/>
        </BaseWidget>
      </Box>
      <Box
        className="tasks"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
          flexWrap: "wrap",
          flexGrow: 1
        }}
      >
        <BaseWidget title="Today's Tasks" sx={{ flexBasis: "45%" }}>
          <TaskList overdue={true} />
        </BaseWidget>
        {/* <BaseWidget title="Today's Tasks" sx={{ flexBasis: "45%" }}>
          <TaskList interval="today" />
        </BaseWidget> */}
      </Box>
      <Card
        sx={{
          padding: "20px",
          backgroundColor: "rgba(0, 0, 0, 0.11)",
          borderRadius: "20px",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            marginBottom: "10px",
            display: "inline-block",
          }}
        >
          My Plants
        </Typography>
        <a
          style={{ display: "inline-block", marginLeft: "10px" }}
          href="/plants"
        >
          View All
        </a>
        <Box className="plant-list">
          {(plantsLoading || !plants || plants.length === 0) && (
            <>
              <PlantCard isLoading />
              <PlantCard isLoading />
              <PlantCard isLoading />
              <PlantCard isLoading />
              <PlantCard isLoading />
              <PlantCard isLoading />
            </>
          )}
          {!plantsLoading &&
            plants &&
            plants.map((plant) => (
              <PlantCard plant={plant} isLoading={plantsLoading} />
            ))}
        </Box>
      </Card>
    </div>
  );
};
export default HomePage;
