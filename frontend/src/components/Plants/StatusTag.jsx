import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";


const StatusTag = ({ status }) => {
  const icon =
    status == "Ok" ? (
      <CheckCircleIcon className="status-icon ok-status-icon" />
    ) : (
      <PriorityHighIcon className="status-icon" />
    );
  const className = status == "Ok" ? "ok-status" : "alert-status";
  return (
    <div className={className}>
      {icon}
      <span>{status}</span>
    </div>
  );
};
export default StatusTag;
