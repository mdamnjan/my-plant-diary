import { Typography } from "@mui/material";

import WateringLineChart from "../../WateringLineChart";

const WateringTab = ({plant, entries}) => {
  return (
    <>
      <Typography variant="body1">
        Last Watered: {plant?.last_watered}
      </Typography>
      <Typography variant="body1">
        Next Watering: {plant?.next_watering}
      </Typography>
      <Typography variant="body1">
        Watering Frequency: {plant?.watering_frequency}
      </Typography>
      {entries.length > 0 && <WateringLineChart entries={entries} />}
    </>
  );
};
export default WateringTab;
