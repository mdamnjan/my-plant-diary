import "./Login.css";

import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-form-container">
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
      <Button className="login-button" variant="contained">Log In</Button>
      </div>
    </div>
  );
};
export default LoginPage;
