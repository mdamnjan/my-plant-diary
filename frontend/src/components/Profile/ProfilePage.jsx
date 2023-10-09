import {
  Typography,
  Box,
  Avatar,
  Divider,
  TextField,
  FormGroup,
  FormControl,
  FormControlLabel,
  Switch,
} from "@mui/material";

const ProfilePage = () => {
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h2">Profile</Typography>
      </Box>
      <Box sx={{ padding: "20px", display: "flex", alignItems: "center" }}>
        <Avatar sx={{ width: 100, height: 100, marginRight: "20px" }} />
        <Typography variant="h4">mdamnjan</Typography>
      </Box>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4">Details</Typography>
        <Divider />
        <div
          style={{
            display: "block",
            alignItems: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <div>
            <Typography variant="h5">email</Typography>{" "}
            <TextField disabled value="mdamnjan@gmail.com" />
          </div>
          <div>
            <Typography variant="h5">username</Typography>{" "}
            <TextField disabled value="mdamnjan" />
          </div>
          <div>
            {" "}
            <Typography variant="h5">password</Typography>{" "}
            <TextField disabled type="password" value="password" />
          </div>
        </div>
        <Typography variant="h4">Settings</Typography>
        <Divider />
        <div style={{ marginTop: "20px" }}>
          <Typography
            variant="h5"
            style={{ marginRight: "20px", display: "block" }}
          >
            Mode
          </Typography>{" "}
          <span>Light</span>
          <Switch checked></Switch>
          <span>Dark</span>
          <Typography
            variant="h5"
            style={{ marginRight: "20px", display: "block" }}
          >
            Alerts
          </Typography>{" "}
          <Typography
            variant="body"
            style={{ marginRight: "20px", display: "block" }}
          >
            Get alerts when this type of task is overdue:
          </Typography>{" "}
          <FormControl
            style={{ marginLeft: "50px" }}
            component="fieldset"
            variant="standard"
          >
            <FormGroup>
              <FormControlLabel
                control={<Switch checked name="water" />}
                label="Watering"
              />
              <FormControlLabel
                control={<Switch checked name="water" />}
                label="Repotting"
              />
              <FormControlLabel
                control={<Switch checked name="water" />}
                label="Progress Update"
              />
              <FormControlLabel
                control={<Switch checked name="water" />}
                label="Propagate"
              />
            </FormGroup>
          </FormControl>
        </div>
      </Box>
    </div>
  );
};
export default ProfilePage;
