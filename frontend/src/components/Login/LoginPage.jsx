import "./Login.css";

import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";

const LoginPage = () => {
  return (
    <div className="login-container">
      <form className="login-form">
      <Typography>
        <img id="logo" src="leaf-svgrepo-com.svg" />
        <h2>My Plant Diary</h2>
      </Typography>
        <TextField
          id="outlined-basic"
          className="text-field"
          label="Username"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          className="text-field"
          label="Password"
          variant="outlined"
          type="password"
        />
        <Button className="login-button" variant="contained">
          Log In
        </Button>
      </form>
    </div>
  );
};
export default LoginPage;
