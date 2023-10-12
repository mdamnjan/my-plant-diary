
import { Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

const WateringLineChart = ({ entries }) => {
  let dates = [...new Set(entries.map((entry) => entry.watered_on))];
  let counts = [0];

  dates.slice(1).forEach((x, i) => {
    const date1 = new Date(x).getTime();
    const date2 = new Date(dates[i]).getTime();

    counts.push((date2 - date1) / (1000 * 3600 * 24));
  });

  return (
    <>
      <Typography variant="h5">Days between watering</Typography>
      <LineChart
        margin={{ top: 10 }}
        xAxis={[
          {
            scaleType: "point",
            data: dates,
            valueFormatter: (v) => v.slice(5),
          },
        ]}
        series={[
          {
            data: counts,
            label: 'days',
          },
        ]}
        width={800}
        height={300}
      />
    </>
  );
};
export default WateringLineChart;
