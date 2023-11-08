import { Card, Typography } from "@mui/material";

const BaseWidget = (props) => {
  return (
    <Card
      sx={{
        backgroundColor: "#dadada9e",
        borderRadius: "10px",
        padding: "20px",
        flexGrow: 1,
        ...props.sx
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", marginBottom: "10px" }}
      >
        {props.title}
      </Typography>
      {props.children}
    </Card>
  );
};
export default BaseWidget;
