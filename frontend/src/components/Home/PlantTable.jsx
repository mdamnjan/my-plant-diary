import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import StatusTag from "../Plants/StatusTag";

const PlantTable = ({ plants }) => {
  let rows = plants.map((plant) => {
    const plantName = (
      <div style={{ display: "flex", alignItems: "center" }}>
        {" "}
        <img
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            marginRight: "5px",
          }}
          alt="plant"
          src="../../Calathea_orbifolia.jpg"
        ></img>
        <span>{plant.name}</span>
      </div>
    );

    const plantStatus = <StatusTag status={plant.status_display} />;

    return {
      name: plantName,
      lastWatered: plant.last_watered,
      wateringFrequency: plant.watering_frequency,
      nextWatering: plant.next_watering,
      status: plantStatus,
    };
  });

  return (
    <TableContainer sx={{width: "40%"}} component={Paper}>
      <Table aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell>Plant</TableCell>
            {/* <TableCell align="left">Last Watered</TableCell> */}
            <TableCell align="left">Watering Frequency</TableCell>
            {/* <TableCell align="left">Next Watering</TableCell> */}
            <TableCell align="left">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              {/* <TableCell align="left">{row.lastWatered || "-"}</TableCell> */}
              <TableCell align="left">{row.wateringFrequency}</TableCell>
              {/* <TableCell align="left">{row.nextWatering || "-"}</TableCell> */}
              <TableCell style={{position: "relative"}} align="left">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default PlantTable;
