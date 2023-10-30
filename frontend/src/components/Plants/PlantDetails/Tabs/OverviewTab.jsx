import { Box, Typography } from "@mui/material";
import { Task as MuiTask } from "@mui/icons-material";

import NumberWidget from "../../../Home/NumberWidget";
import WateringLineChart from "../../WateringLineChart";

const OverviewTab = ({ plant, entries }) => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#d9d9d99e",
          borderRadius: "20px",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <Typography variant="h6">
          Last Watered: {plant?.last_watered}
        </Typography>
        <Typography variant="h6">
          Next Watering: {plant?.next_watering}
        </Typography>
        <Typography variant="h6">
          Watering Frequency: {plant?.watering_frequency_display}
        </Typography>
        {entries.length > 0 && <WateringLineChart entries={entries} />}
      </Box>
      <Box sx={{ display: "flex", gap: "20px" }}>
        <NumberWidget
          data={3}
          icon={<MuiTask />}
          subtitle={"tasks today"}
          backgroundColor={"#c5edfa"}
          iconColor={"#3865da"}
        />
        <NumberWidget
          data={2}
          icon={<MuiTask />}
          subtitle={"overdue tasks"}
          backgroundColor={"#c5edfa"}
          iconColor={"#3865da"}
        />
      </Box>
    </>
  );
};
export default OverviewTab;
