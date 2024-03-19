import { Typography, Box, Avatar, Divider, TextField } from "@mui/material";

import { useQuery } from "react-query";
import { fetchUser } from "../../api";

const ProfilePage = () => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
    initialData: {
      username: "",
      email: "",
    },
  });
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h2">Profile</Typography>
      </Box>
      <Box sx={{ padding: "20px", display: "flex", alignItems: "center" }}>
        <Avatar sx={{ width: 100, height: 100, marginRight: "20px" }} />
        <Typography variant="h4">{user.username}</Typography>
      </Box>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4">Details</Typography>
        <Divider />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: "20px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Email"
            disabled
            variant="filled"
            value={user.email}
          />
          <TextField
            id="outlined-basic"
            label="Username"
            disabled
            variant="filled"
            value={user.username}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            disabled
            variant="filled"
            type="password"
            value="password"
          />
        </div>
      </Box>
    </div>
  );
};
export default ProfilePage;
