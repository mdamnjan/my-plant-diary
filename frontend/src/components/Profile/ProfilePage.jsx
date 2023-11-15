import {
  Typography,
  Box,
  Avatar,
  Divider,
  TextField,
} from "@mui/material";

import { useQuery } from "react-query";
import { fetchUser } from "../../api";

const ProfilePage = () => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
    initialData: {
      username: "",
      email: ""
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
            display: "block",
            alignItems: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <div>
            <Typography variant="h5">email</Typography>{" "}
            <TextField disabled value={user.email} />
          </div>
          <div>
            <Typography variant="h5">username</Typography>{" "}
            <TextField disabled value={user.username} />
          </div>
          <div>
            <Typography variant="h5">password</Typography>{" "}
            <TextField disabled type="password" value="password" />
          </div>
        </div>
      </Box>
    </div>
  );
};
export default ProfilePage;
