import { CheckCircle, Error } from "@mui/icons-material";
import { Chip } from "@mui/material";

const StatusTag = ({ status }) => {
  const icon =
    status === "Ok" ? (
      <CheckCircle className="status-icon ok-status-icon" />
    ) : (
      <Error className="status-icon" />
    );
  const className = status === "Ok" ? "ok-status" : "alert-status";
  return (
    <Chip label={status} variant="filled" icon={icon} className={className} />
  );
};
export default StatusTag;
