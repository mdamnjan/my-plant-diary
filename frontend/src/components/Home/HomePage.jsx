import { Typography, Box, Card } from "@mui/material";

import { fetchPlants, fetchUser } from "../../api";
import "./HomePage.css";
import BaseWidget from "../common/BaseWidget";
import TaskList from "../Tasks/TaskList";
import TaskProgressBar from "../Tasks/TaskProgressBar";
import { useQuery } from "react-query";
import Calendar from "../common/Calendar";
import PlantList from "../Plants/PlantList";

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
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <BaseWidget
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "#c5edfa",
              gap: "20px",
            }}
          >
            <Typography>
              {user.completed_task_count}/{user.task_count}
            </Typography>
            <TaskProgressBar resource={user} />
          </BaseWidget>
          <BaseWidget title="Calendar">
            <Calendar />
          </BaseWidget>
        </Box>
        <BaseWidget title="Today's Tasks">
          <TaskList interval="today" />
        </BaseWidget>
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
        <PlantList plantList={plants} isLoading={plantsLoading} />
      </Card>
    </div>
  );
};
export default HomePage;
